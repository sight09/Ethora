const { spawn } = require('child_process');
const fs = require('fs');

async function main() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const child = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9218',
    '--window-size=1440,900',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const jsonRes = await fetch('http://127.0.0.1:9218/json');
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

    const testCss = `
      .hero {
        min-height: 580px !important;
        height: min(700px, calc(100vh - 62px)) !important;
        position: relative !important;
        display: flex !important;
        align-items: flex-start !important;
        justify-content: flex-start !important;
        text-align: left !important;
        padding: clamp(28px, 4.5vh, 44px) clamp(24px, 7vw, 112px) 60px !important;
        isolation: isolate !important;
        z-index: 2 !important;
      }

      .hero-overlay {
        position: absolute !important;
        inset: 0 !important;
        z-index: -2 !important;
        background:
          linear-gradient(90deg, #0A0A12f5 0%, #0A0A12dc 32%, #0A0A1235 72%, #0A0A1250 100%),
          linear-gradient(0deg, #0A0A12 0%, transparent 28%, #0A0A1222 85%, #0A0A12 100%) !important;
      }

      .hero-content {
        max-width: 620px !important;
        width: 100% !important;
        margin: 0 !important;
        display: block !important;
        text-align: left !important;
        position: static !important;
        z-index: 2 !important;
      }

      .hero h1 {
        margin: 0 !important;
        font-family: 'Exo 2', sans-serif !important;
        font-size: clamp(44px, 6.2vw, 80px) !important;
        font-weight: 800 !important;
        line-height: 1.05 !important;
        letter-spacing: -0.02em !important;
        text-transform: uppercase !important;
        color: #F4F1FF !important;
        text-align: left !important;
        text-shadow: 0 5px 30px rgba(0, 0, 0, 0.85) !important;
      }

      .hero-subtitle {
        max-width: 520px !important;
        margin: 20px 0 20px !important;
        color: #B8B3CC !important;
        font-family: 'Exo 2', sans-serif !important;
        font-size: 18px !important;
        font-weight: 400 !important;
        line-height: 1.6 !important;
        text-align: left !important;
      }

      .community-proof {
        display: flex !important;
        align-items: center !important;
        justify-content: flex-start !important;
        gap: 14px !important;
        margin-top: 18px !important;
      }

      .hero-vertical {
        display: block !important;
      }

      .hero-scroll {
        left: clamp(24px, 7vw, 112px) !important;
        transform: none !important;
      }

      /* THE BUTTONS CENTERED ON THE PAGE */
      @media (min-width: 761px) {
        .hero-buttons {
          position: absolute !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          bottom: 65px !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          gap: 14px !important;
          width: max-content !important;
          margin: 0 !important;
          z-index: 25 !important;
        }
      }

      @media (max-width: 760px) {
        .hero {
          height: auto !important;
          min-height: 600px !important;
          padding: 60px 20px 80px !important;
          align-items: flex-end !important;
        }
        .hero-content {
          position: relative !important;
        }
        .hero-buttons {
          position: static !important;
          transform: none !important;
          margin: 24px auto 0 !important;
          display: flex !important;
          justify-content: center !important;
          width: 100% !important;
        }
      }
    `;

    await send('Runtime.evaluate', {
      expression: `
        const s = document.createElement('style');
        s.id = 'test-css';
        s.innerHTML = ${JSON.stringify(testCss)};
        document.head.appendChild(s);
      `
    });

    // 1. Desktop 1440
    const shotDesktop = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(outDir + '\\verify_only_buttons_centered_desktop.png', Buffer.from(shotDesktop.data, 'base64'));
    console.log('Saved verify_only_buttons_centered_desktop.png');

    // 2. Mobile 390
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 600));
    const shotMobile = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(outDir + '\\verify_only_buttons_centered_mobile.png', Buffer.from(shotMobile.data, 'base64'));
    console.log('Saved verify_only_buttons_centered_mobile.png');

    ws.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    child.kill();
  }
}

main();
