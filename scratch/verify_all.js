const { spawn } = require('child_process');
const fs = require('fs');

async function main() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const child = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9228',
    '--window-size=1440,960',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const jsonRes = await fetch('http://127.0.0.1:9228/json');
    const targets = await jsonRes.json();
    const pageTarget = targets.find(t => t.type === 'page');
    if (!pageTarget) throw new Error('No page target');

    const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
    let id = 1;
    const callbacks = new Map();

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && callbacks.has(msg.id)) {
        const { resolve, reject } = callbacks.get(msg.id);
        callbacks.delete(msg.id);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };

    const send = (method, params = {}) => new Promise((resolve, reject) => {
      const msgId = id++;
      callbacks.set(msgId, { resolve, reject });
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });

    await new Promise(r => { ws.onopen = r; });
    await send('Page.enable');
    await send('Runtime.enable');

    const outDir = 'C:\\Users\\AMANUEL\\.gemini\\antigravity\\brain\\7aa440a6-b530-49c1-b7bf-d99de805d21b';

    // 1. Capture Quickboard on Home Page
    console.log('Navigating to http://localhost:3000...');
    await send('Page.navigate', { url: 'http://localhost:3000' });
    await new Promise(r => setTimeout(r, 2000));
    // Scroll down to quick-board
    await send('Runtime.evaluate', {
      expression: 'document.querySelector(".quick-board")?.scrollIntoView({ behavior: "instant", block: "center" })'
    });
    await new Promise(r => setTimeout(r, 1000));
    const quickboardShot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`${outDir}\\verify_quickboard_circles.png`, Buffer.from(quickboardShot.data, 'base64'));
    console.log('Saved verify_quickboard_circles.png');

    // 2. Sign In and Capture Gamer Dashboard Header
    console.log('Navigating to http://localhost:3000/auth/signin...');
    await send('Page.navigate', { url: 'http://localhost:3000/auth/signin' });
    await new Promise(r => setTimeout(r, 1800));

    // Submit form (already filled with ViperX demo account credentials by default)
    await send('Runtime.evaluate', {
      expression: 'document.querySelector("form")?.requestSubmit()'
    });
    await new Promise(r => setTimeout(r, 2500));

    const dashboardShot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`${outDir}\\verify_signedin_dashboard_header.png`, Buffer.from(dashboardShot.data, 'base64'));
    console.log('Saved verify_signedin_dashboard_header.png');

    ws.close();
    console.log('DONE!');
  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    child.kill();
  }
}

main();
