const { spawn } = require('child_process');
const fs = require('fs');

async function main() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const child = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9252',
    '--window-size=1440,900',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1800));

  try {
    const jsonRes = await fetch('http://127.0.0.1:9252/json');
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

    console.log('Navigating to http://localhost:3000/auth/signin...');
    await send('Page.navigate', { url: 'http://localhost:3000/auth/signin' });
    await new Promise(r => setTimeout(r, 2200));

    // Full signin page screenshot
    const shot1 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\AMANUEL\\.gemini\\antigravity\\brain\\7aa440a6-b530-49c1-b7bf-d99de805d21b\\verify_login_glass_features_full.png', Buffer.from(shot1.data, 'base64'));
    console.log('Saved verify_login_glass_features_full.png');

    // Zoomed in screenshot on the 4 feature items below the mascot
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 2,
      mobile: false
    });
    await new Promise(r => setTimeout(r, 500));

    const shot2 = await send('Page.captureScreenshot', {
      format: 'png',
      clip: {
        x: 80,
        y: 640,
        width: 600,
        height: 200,
        scale: 2
      }
    });
    fs.writeFileSync('C:\\Users\\AMANUEL\\.gemini\\antigravity\\brain\\7aa440a6-b530-49c1-b7bf-d99de805d21b\\verify_login_glass_features_zoomed.png', Buffer.from(shot2.data, 'base64'));
    console.log('Saved verify_login_glass_features_zoomed.png');

    ws.close();
  } finally {
    child.kill();
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
