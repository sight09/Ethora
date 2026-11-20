const { spawn } = require('child_process');
const fs = require('fs');

async function main() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const child = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9217',
    '--window-size=1440,900',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const jsonRes = await fetch('http://127.0.0.1:9217/json');
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

    // In DOM: move .hero-buttons to be direct child of .hero, right after .hero-content
    await send('Runtime.evaluate', {
      expression: `
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        const heroButtons = document.querySelector('.hero-buttons');
        // Move heroButtons to hero
        hero.insertBefore(heroButtons, heroContent.nextSibling);

        // Reset hero and hero-content to left-aligned original styles
        const s = document.createElement('style');
        s.innerHTML = \`
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
            background: linear-gradient(90deg, #0A0A12f5 0%, #0A0A12dc 32%, #0A0A1235 72%, #0A0A1250 100%), linear-gradient(0deg, #0A0A12 0%, transparent 28%, #0A0A1222 85%, #0A0A12 100%) !important;
          }

          .hero-content {
            max-width: 620px !important;
            width: auto !important;
            margin: 0 !important;
            display: block !important;
            text-align: left !important;
            position: relative !important;
            z-index: 2 !important;
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
            display: flex !important;
            align-items: center !important;
            justify-content: flex-start !important;
            gap: 14px !important;
            margin-top: 24px !important;
          }

          .hero-vertical {
            display: block !important;
          }

          .hero-scroll {
            left: clamp(24px, 7vw, 112px) !important;
            transform: none !important;
          }

          @media (min-width: 761px) {
            .hero-buttons {
              position: absolute !important;
              left: 50% !important;
              transform: translateX(-50%) !important;
              bottom: 60px !important;
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
              flex-direction: column !important;
              align-items: center !important;
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
        \`;
        document.head.appendChild(s);
      `
    });

    // 1. Desktop screenshot
    const shotDesktop = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(outDir + '\\test_perfect_direct_child_desktop.png', Buffer.from(shotDesktop.data, 'base64'));
    console.log('Saved test_perfect_direct_child_desktop.png');

    // 2. Mobile screenshot
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 600));
    const shotMobile = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(outDir + '\\test_perfect_direct_child_mobile.png', Buffer.from(shotMobile.data, 'base64'));
    console.log('Saved test_perfect_direct_child_mobile.png');

    ws.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    child.kill();
  }
}

main();
