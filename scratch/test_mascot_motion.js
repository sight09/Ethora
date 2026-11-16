const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function main() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const child = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9226',
    '--window-size=1400,900',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const jsonRes = await fetch('http://127.0.0.1:9226/json');
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

    console.log('Navigating to http://localhost:3000/auth/signin...');
    await send('Page.navigate', { url: 'http://localhost:3000/auth/signin' });
    await new Promise(r => setTimeout(r, 2500));

    // Capture initial sign in with mascot
    let shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`${outDir}\\test_mascot_signin_1.png`, Buffer.from(shot.data, 'base64'));
    console.log('Saved test_mascot_signin_1.png');

    // Simulate mouse move over mascot to test interactive 3D tilt
    console.log('Dispatching mouse move event to test interactive 3D tilt...');
    await send('Runtime.evaluate', {
      expression: `(() => {
        const event = new MouseEvent('mousemove', {
          clientX: 200,
          clientY: 300,
          bubbles: true
        });
        window.dispatchEvent(event);
      })()`
    });
    // Wait for animation to float and tilt
    await new Promise(r => setTimeout(r, 1500));

    // Capture second shot during motion
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`${outDir}\\test_mascot_signin_2.png`, Buffer.from(shot.data, 'base64'));
    console.log('Saved test_mascot_signin_2.png');

    // Test register tab (Join ETHORA) matching user screenshot
    console.log('Switching to Register tab...');
    await send('Runtime.evaluate', {
      expression: `(() => {
        const regTab = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Register'));
        if (regTab) regTab.click();
      })()`
    });
    await new Promise(r => setTimeout(r, 1000));

    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`${outDir}\\test_mascot_register.png`, Buffer.from(shot.data, 'base64'));
    console.log('Saved test_mascot_register.png');

    ws.close();
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    child.kill();
  }
}

main();
