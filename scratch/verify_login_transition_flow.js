const { spawn } = require('child_process');
const fs = require('fs');

async function main() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const child = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9214',
    '--window-size=1440,900',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const jsonRes = await fetch('http://127.0.0.1:9214/json');
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
    await new Promise(r => setTimeout(r, 3000));

    const outDir = 'C:\\Users\\AMANUEL\\.gemini\\antigravity\\brain\\7aa440a6-b530-49c1-b7bf-d99de805d21b';

    // 1. Capture landing page before click
    const shot0 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(outDir + '\\transition_flow_1_landing.png', Buffer.from(shot0.data, 'base64'));
    console.log('Saved transition_flow_1_landing.png');

    // 2. Click "Get Started"
    await send('Runtime.evaluate', {
      expression: `
        const btn = document.querySelector('.btn-get-started');
        if (btn) btn.click();
      `
    });

    // 3. Capture during transition
    await new Promise(r => setTimeout(r, 60));
    const shotLaser = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(outDir + '\\transition_flow_2_laser_beam.png', Buffer.from(shotLaser.data, 'base64'));
    console.log('Saved transition_flow_2_laser_beam.png');

    // 4. Capture arriving on auth page (during entrance animation)
    await new Promise(r => setTimeout(r, 150));
    const shotEntering = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(outDir + '\\transition_flow_3_auth_entering.png', Buffer.from(shotEntering.data, 'base64'));
    console.log('Saved transition_flow_3_auth_entering.png');

    // 5. Capture fully settled login page
    await new Promise(r => setTimeout(r, 600));
    const shotFinal = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(outDir + '\\transition_flow_4_auth_settled.png', Buffer.from(shotFinal.data, 'base64'));
    console.log('Saved transition_flow_4_auth_settled.png');

    ws.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    child.kill();
  }
}

main();
