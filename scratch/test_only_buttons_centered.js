const { spawn } = require('child_process');
const fs = require('fs');

async function main() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const child = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9220',
    '--window-size=1440,900',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const jsonRes = await fetch('http://127.0.0.1:9220/json');
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

    // Test A: Restore hero, hero-content, subtitle, community-proof to left-aligned.
    // Make ONLY .hero-buttons centered in the page horizontally, sitting at the bottom center of the hero section.
    await send('Runtime.evaluate', {
      expression: `
        const s = document.createElement('style');
        s.id = 'style-posA';
        s.innerHTML = \`
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
            position: relative !important;
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

          /* ONLY BUTTONS CENTERED IN PAGE */
          .hero-buttons {
            position: absolute !important;
            left: 50vw !important;
            transform: translateX(-50%) !important;
            bottom: 45px !important;
            width: max-content !important;
            margin: 0 !important;
            z-index: 30 !important;
          }
        \`;
        document.head.appendChild(s);
      `
    });
    const shotA = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(outDir + '\\test_only_btn_center_bottom.png', Buffer.from(shotA.data, 'base64'));

    // Test B: Only buttons centered in page horizontally, but positioned at the vertical level between subtitle and community-proof
    await send('Runtime.evaluate', {
      expression: `
        document.getElementById('style-posA').remove();
        const sB = document.createElement('style');
        sB.id = 'style-posB';
        sB.innerHTML = \`
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
            position: static !important; /* let absolute child reference .hero */
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

          /* ONLY BUTTONS CENTERED IN PAGE AT Y ~ 530px */
          .hero-buttons {
            position: absolute !important;
            left: 50% !important;
            top: 530px !important;
            transform: translateX(-50%) !important;
            width: max-content !important;
            margin: 0 !important;
            z-index: 30 !important;
          }
        \`;
        document.head.appendChild(sB);
      `
    });
    const shotB = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(outDir + '\\test_only_btn_center_mid.png', Buffer.from(shotB.data, 'base64'));

    // Test C: In flow, what if hero-buttons breaks out of hero-content?
    // What if .hero-buttons is placed at bottom center, e.g. bottom: 65px?
    await send('Runtime.evaluate', {
      expression: `
        document.getElementById('style-posB').remove();
        const sC = document.createElement('style');
        sC.id = 'style-posC';
        sC.innerHTML = \`
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
            margin: 24px 0 0 !important;
          }
          .hero-vertical {
            display: block !important;
          }
          .hero-scroll {
            left: clamp(24px, 7vw, 112px) !important;
            transform: none !important;
          }

          /* ONLY BUTTONS CENTERED IN PAGE AT BOTTOM OF HERO (over podium 1 base) */
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
        document.head.appendChild(sC);
      `
    });
    const shotC = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(outDir + '\\test_only_btn_center_bottom75.png', Buffer.from(shotC.data, 'base64'));

    console.log('Saved test_only_btn_center A, B, C');
    ws.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    child.kill();
  }
}

main();
