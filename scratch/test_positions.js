const { spawn } = require('child_process');
const fs = require('fs');

async function main() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const child = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9219',
    '--window-size=1440,900',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const jsonRes = await fetch('http://127.0.0.1:9219/json');
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
    await new Promise(r => setTimeout(r, 5200));

    const outDir = 'C:\\Users\\AMANUEL\\.gemini\\antigravity\\brain\\7aa440a6-b530-49c1-b7bf-d99de805d21b';

    const baseCss = `
      .hero {
        display: flex !important;
        align-items: flex-start !important;
        justify-content: flex-start !important;
        text-align: left !important;
        padding: clamp(28px, 4.5vh, 44px) clamp(24px, 7vw, 112px) 60px !important;
        position: relative !important;
      }
      .hero-overlay {
        background: linear-gradient(90deg, #0A0A12f5 0%, #0A0A12dc 32%, #0A0A1235 72%, #0A0A1250 100%), linear-gradient(0deg, #0A0A12 0%, transparent 28%, #0A0A1222 85%, #0A0A12 100%) !important;
      }
      .hero-content {
        max-width: 620px !important;
        margin: 0 !important;
        display: block !important;
        text-align: left !important;
        align-items: flex-start !important;
        position: static !important;
      }
      .hero h1 {
        text-align: left !important;
      }
      .hero-subtitle {
        margin: 20px 0 28px !important;
        text-align: left !important;
        max-width: 520px !important;
      }
      .community-proof {
        justify-content: flex-start !important;
        margin: 36px 0 0 !important;
      }
      .hero-vertical {
        display: block !important;
      }
      .hero-scroll {
        left: clamp(24px, 7vw, 112px) !important;
        transform: none !important;
      }
    `;

    // Test 1: bottom: 50px
    await send('Runtime.evaluate', {
      expression: `
        const s1 = document.createElement('style');
        s1.id = 'style-eval';
        s1.innerHTML = ${JSON.stringify(baseCss)} + \`
          .hero-buttons {
            position: absolute !important;
            left: 50% !important;
            bottom: 50px !important;
            transform: translateX(-50%) !important;
            width: max-content !important;
            margin: 0 !important;
            z-index: 30 !important;
          }
        \`;
        document.head.appendChild(s1);
      `
    });
    const shot1 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(outDir + '\\test_pos_bottom50.png', Buffer.from(shot1.data, 'base64'));

    // Test 2: bottom: 75px
    await send('Runtime.evaluate', {
      expression: `
        document.getElementById('style-eval').innerHTML = ${JSON.stringify(baseCss)} + \`
          .hero-buttons {
            position: absolute !important;
            left: 50% !important;
            bottom: 75px !important;
            transform: translateX(-50%) !important;
            width: max-content !important;
            margin: 0 !important;
            z-index: 30 !important;
          }
        \`;
      `
    });
    const shot2 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(outDir + '\\test_pos_bottom75.png', Buffer.from(shot2.data, 'base64'));

    // Test 3: bottom: 110px
    await send('Runtime.evaluate', {
      expression: `
        document.getElementById('style-eval').innerHTML = ${JSON.stringify(baseCss)} + \`
          .hero-buttons {
            position: absolute !important;
            left: 50% !important;
            bottom: 110px !important;
            transform: translateX(-50%) !important;
            width: max-content !important;
            margin: 0 !important;
            z-index: 30 !important;
          }
        \`;
      `
    });
    const shot3 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(outDir + '\\test_pos_bottom110.png', Buffer.from(shot3.data, 'base64'));

    // Test 4: bottom: 155px
    await send('Runtime.evaluate', {
      expression: `
        document.getElementById('style-eval').innerHTML = ${JSON.stringify(baseCss)} + \`
          .hero-buttons {
            position: absolute !important;
            left: 50% !important;
            bottom: 155px !important;
            transform: translateX(-50%) !important;
            width: max-content !important;
            margin: 0 !important;
            z-index: 30 !important;
          }
        \`;
      `
    });
    const shot4 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(outDir + '\\test_pos_bottom155.png', Buffer.from(shot4.data, 'base64'));

    console.log('Saved 4 position tests');
    ws.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    child.kill();
  }
}

main();
