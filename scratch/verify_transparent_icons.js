const { spawn } = require('child_process');
const fs = require('fs');

async function main() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const child = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9246',
    '--window-size=1440,900',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1800));

  try {
    const jsonRes = await fetch('http://127.0.0.1:9246/json');
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
    await new Promise(r => setTimeout(r, 1500));

    // Click "ViperX" demo pill and then "SIGN IN"
    console.log('Logging in as ViperX...');
    await send('Runtime.evaluate', {
      expression: `
        const viperPill = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('ViperX'));
        if (viperPill) viperPill.click();
        setTimeout(() => {
          const submitBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('SIGN IN'));
          if (submitBtn) submitBtn.click();
        }, 150);
      `
    });

    await new Promise(r => setTimeout(r, 1500));

    // Capture 1: Gamer Dashboard with Sidebar and AI chat button
    const shot1 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\AMANUEL\\.gemini\\antigravity\\brain\\7aa440a6-b530-49c1-b7bf-d99de805d21b\\verify_dashboard_sidebar_transparent_logo.png', Buffer.from(shot1.data, 'base64'));
    console.log('Saved verify_dashboard_sidebar_transparent_logo.png');

    // Click the floating AI button to open the AI Chat window
    console.log('Clicking floating AI button...');
    await send('Runtime.evaluate', {
      expression: `
        const btn = document.querySelector('button[title*="ETHORA AI"]') || Array.from(document.querySelectorAll('button')).find(b => b.innerText && b.innerText.includes('ETHORA AI'));
        if (btn) btn.click();
      `
    });
    await new Promise(r => setTimeout(r, 800));

    // Capture 2: AI chat opened with transparent logo
    const shot2 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\AMANUEL\\.gemini\\antigravity\\brain\\7aa440a6-b530-49c1-b7bf-d99de805d21b\\verify_ai_chat_transparent_logo_active.png', Buffer.from(shot2.data, 'base64'));
    console.log('Saved verify_ai_chat_transparent_logo_active.png');

    ws.close();
  } finally {
    child.kill();
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
