const { spawn } = require('child_process');
const fs = require('fs');

async function main() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const child = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9280',
    '--window-size=390,844',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1800));

  try {
    const jsonRes = await fetch('http://127.0.0.1:9280/json');
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

    await new Promise(r => ws.onopen = r);

    await send('Page.enable');
    await send('Runtime.enable');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });

    // 1. Mobile Landing Hero
    await send('Page.navigate', { url: 'http://localhost:3000/' });
    await new Promise(r => setTimeout(r, 2200));
    const heroSnap = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(
      'C:\\Users\\AMANUEL\\.gemini\\antigravity\\brain\\7aa440a6-b530-49c1-b7bf-d99de805d21b\\mobile_v2_hero.png',
      Buffer.from(heroSnap.data, 'base64')
    );
    console.log('Saved mobile_v2_hero.png');

    // 2. Open Mobile Navigation Drawer
    await send('Runtime.evaluate', {
      expression: `
        const btn = document.querySelector('.mobile-menu-btn');
        if (btn) btn.click();
      `
    });
    await new Promise(r => setTimeout(r, 800));
    const menuSnap = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(
      'C:\\Users\\AMANUEL\\.gemini\\antigravity\\brain\\7aa440a6-b530-49c1-b7bf-d99de805d21b\\mobile_v2_menu_open.png',
      Buffer.from(menuSnap.data, 'base64')
    );
    console.log('Saved mobile_v2_menu_open.png');

    // Close menu and scroll to Quick-board
    await send('Runtime.evaluate', {
      expression: `
        const btn = document.querySelector('.mobile-menu-btn');
        if (btn) btn.click();
        const qb = document.querySelector('.quick-board');
        if (qb) qb.scrollIntoView({ behavior: 'instant', block: 'start' });
      `
    });
    await new Promise(r => setTimeout(r, 800));
    const qbSnap = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(
      'C:\\Users\\AMANUEL\\.gemini\\antigravity\\brain\\7aa440a6-b530-49c1-b7bf-d99de805d21b\\mobile_v2_quick_board.png',
      Buffer.from(qbSnap.data, 'base64')
    );
    console.log('Saved mobile_v2_quick_board.png');

    ws.close();
  } catch (err) {
    console.error('Mobile capture error:', err);
  } finally {
    child.kill();
  }
}

main();
