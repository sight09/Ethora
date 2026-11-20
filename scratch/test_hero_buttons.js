const { spawn } = require('child_process');
const fs = require('fs');

async function main() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const child = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9227',
    '--window-size=1440,900',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const jsonRes = await fetch('http://127.0.0.1:9227/json');
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
    await new Promise(r => setTimeout(r, 2000));

    // Get current dimensions and layout info
    const infoRes = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const hero = document.querySelector('.hero');
          const content = document.querySelector('.hero-content');
          const buttons = document.querySelector('.hero-buttons');
          const heroRect = hero ? hero.getBoundingClientRect() : null;
          const contentRect = content ? content.getBoundingClientRect() : null;
          const buttonsRect = buttons ? buttons.getBoundingClientRect() : null;
          return JSON.stringify({ heroRect, contentRect, buttonsRect, windowWidth: window.innerWidth });
        })()
      `,
      returnByValue: true
    });
    console.log('Layout Info:', infoRes.result.value);

    // Option 1: Justify-content center in hero-buttons
    await send('Runtime.evaluate', {
      expression: `
        const style1 = document.createElement('style');
        style1.id = 'opt1';
        style1.innerHTML = '.hero-buttons { justify-content: center !important; }';
        document.head.appendChild(style1);
      `
    });
    const shot1 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\AMANUEL\\.gemini\\antigravity\\brain\\7aa440a6-b530-49c1-b7bf-d99de805d21b\\test_opt1_buttons_centered_in_content.png', Buffer.from(shot1.data, 'base64'));
    console.log('Saved test_opt1_buttons_centered_in_content.png');

    // Remove opt1 and test Option 2: Full hero centered buttons
    await send('Runtime.evaluate', {
      expression: `
        document.getElementById('opt1').remove();
        const style2 = document.createElement('style');
        style2.id = 'opt2';
        style2.innerHTML = \`
          .hero-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            margin: 0 auto;
          }
          .hero-buttons {
            justify-content: center !important;
          }
          .community-proof {
            justify-content: center;
          }
        \`;
        document.head.appendChild(style2);
      `
    });
    const shot2 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\AMANUEL\\.gemini\\antigravity\\brain\\7aa440a6-b530-49c1-b7bf-d99de805d21b\\test_opt2_hero_content_centered.png', Buffer.from(shot2.data, 'base64'));
    console.log('Saved test_opt2_hero_content_centered.png');

    // Option 3: Only buttons horizontally centered across the page/hero while keeping text on the left
    await send('Runtime.evaluate', {
      expression: `
        document.getElementById('opt2').remove();
        const style3 = document.createElement('style');
        style3.id = 'opt3';
        style3.innerHTML = \`
          .hero-buttons {
            position: absolute;
            left: 50%;
            bottom: 40px;
            transform: translateX(-50%);
            z-index: 10;
          }
        \`;
        document.head.appendChild(style3);
      `
    });
    const shot3 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\AMANUEL\\.gemini\\antigravity\\brain\\7aa440a6-b530-49c1-b7bf-d99de805d21b\\test_opt3_buttons_absolute_center.png', Buffer.from(shot3.data, 'base64'));
    console.log('Saved test_opt3_buttons_absolute_center.png');

    ws.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    child.kill();
  }
}

main();
