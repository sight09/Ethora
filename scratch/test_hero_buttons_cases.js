const { spawn } = require('child_process');
const fs = require('fs');

async function main() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const child = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9226',
    '--window-size=1440,900',
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

    console.log('Navigating to http://localhost:3000...');
    await send('Page.navigate', { url: 'http://localhost:3000' });
    // Wait for typewriter to fully finish (~4.5s)
    await new Promise(r => setTimeout(r, 5000));

    // Case 1: hero-buttons justify-content: center
    await send('Runtime.evaluate', {
      expression: `
        const style1 = document.createElement('style');
        style1.id = 'case1';
        style1.innerHTML = \`
          .hero-buttons {
            justify-content: center !important;
            margin: 0 auto;
          }
        \`;
        document.head.appendChild(style1);
      `
    });
    const shot1 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\AMANUEL\\.gemini\\antigravity\\brain\\7aa440a6-b530-49c1-b7bf-d99de805d21b\\case1_buttons_centered_in_content.png', Buffer.from(shot1.data, 'base64'));

    // Case 2: hero-buttons + community-proof centered
    await send('Runtime.evaluate', {
      expression: `
        const style2 = document.createElement('style');
        style2.id = 'case2';
        style2.innerHTML = \`
          .community-proof {
            justify-content: center !important;
          }
        \`;
        document.head.appendChild(style2);
      `
    });
    const shot2 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\AMANUEL\\.gemini\\antigravity\\brain\\7aa440a6-b530-49c1-b7bf-d99de805d21b\\case2_buttons_and_proof_centered.png', Buffer.from(shot2.data, 'base64'));

    // Check Case 1 on Mobile (390px)
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 500));
    const shotMobile = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\AMANUEL\\.gemini\\antigravity\\brain\\7aa440a6-b530-49c1-b7bf-d99de805d21b\\case1_mobile_390.png', Buffer.from(shotMobile.data, 'base64'));

    console.log('Screenshots saved!');
    ws.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    child.kill();
  }
}

main();
