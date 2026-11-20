const { spawn } = require('child_process');
const fs = require('fs');

async function main() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const child = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9215',
    '--window-size=1440,900',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const jsonRes = await fetch('http://127.0.0.1:9215/json');
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

    console.log('Navigating directly to http://localhost:3000/auth/signin...');
    await send('Page.navigate', { url: 'http://localhost:3000/auth/signin' });
    await new Promise(r => setTimeout(r, 2000));

    const outDir = 'C:\\Users\\AMANUEL\\.gemini\\antigravity\\brain\\7aa440a6-b530-49c1-b7bf-d99de805d21b';

    // Capture current signin page
    const currentShot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(outDir + '\\current_signin_page.png', Buffer.from(currentShot.data, 'base64'));
    console.log('Saved current_signin_page.png');

    // Test with the new cinematic entrance CSS
    const animCss = `
      @keyframes authPageFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes authBgCinematic {
        from { opacity: 0.6; transform: scale(1.035); }
        to { opacity: 1; transform: scale(1); }
      }
      @keyframes authHeaderDown {
        from { opacity: 0; transform: translateY(-14px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes authCardElevate {
        from { opacity: 0; transform: translateY(24px) scale(0.985); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
      @keyframes authLeftReveal {
        from { opacity: 0; transform: translateY(18px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .auth-entry-page { animation: authPageFadeIn 0.35s ease-out forwards; }
      .auth-entry-bg { animation: authBgCinematic 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      .auth-entry-header { animation: authHeaderDown 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      .auth-entry-card { animation: authCardElevate 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both; }
      .auth-entry-left { animation: authLeftReveal 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.03s both; }
    `;

    await send('Runtime.evaluate', {
      expression: `
        const s = document.createElement('style');
        s.innerHTML = ${JSON.stringify(animCss)};
        document.head.appendChild(s);

        const pageRoot = document.querySelector('div.relative.h-screen');
        if (pageRoot) pageRoot.classList.add('auth-entry-page');
        const bg = document.querySelector('.fixed.inset-0.z-0');
        if (bg) bg.classList.add('auth-entry-bg');
        const header = document.querySelector('header');
        if (header) header.classList.add('auth-entry-header');
        const left = document.querySelector('.hidden.lg\\\\:flex.lg\\\\:col-span-6');
        if (left) left.classList.add('auth-entry-left');
        const card = document.querySelector('.lg\\\\:col-span-6.flex.justify-center');
        if (card) card.classList.add('auth-entry-card');
      `
    });

    const shotAnimated = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(outDir + '\\test_signin_cinematic.png', Buffer.from(shotAnimated.data, 'base64'));
    console.log('Saved test_signin_cinematic.png');

    ws.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    child.kill();
  }
}

main();
