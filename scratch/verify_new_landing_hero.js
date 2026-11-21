const { spawn } = require('child_process');
const fs = require('fs');

async function main() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const child = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9250',
    '--window-size=1440,900',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1800));

  try {
    const jsonRes = await fetch('http://127.0.0.1:9250/json');
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
    await new Promise(r => setTimeout(r, 2200));

    // Shot 1: Desktop Landing Page Hero
    const shot1 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\AMANUEL\\.gemini\\antigravity\\brain\\7aa440a6-b530-49c1-b7bf-d99de805d21b\\verify_landing_hero_new_wordmark.png', Buffer.from(shot1.data, 'base64'));
    console.log('Saved verify_landing_hero_new_wordmark.png');

    // Emulate Mobile Device
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 800));

    // Shot 2: Mobile Landing Page Hero
    const shot2 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\AMANUEL\\.gemini\\antigravity\\brain\\7aa440a6-b530-49c1-b7bf-d99de805d21b\\verify_landing_hero_mobile.png', Buffer.from(shot2.data, 'base64'));
    console.log('Saved verify_landing_hero_mobile.png');

    ws.close();
  } finally {
    child.kill();
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
