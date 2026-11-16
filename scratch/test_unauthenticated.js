const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function main() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const child = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9225',
    '--window-size=1400,900',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const jsonRes = await fetch('http://127.0.0.1:9225/json');
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

    const outDir = 'C:\\Users\\AMANUEL\\.gemini\\antigravity\\brain\\7aa440a6-b530-49c1-b7bf-d99de805d21b';

    // 1. Clear storage on localhost
    console.log('Navigating to http://localhost:3000 to clear storage...');
    await send('Page.navigate', { url: 'http://localhost:3000' });
    await new Promise(r => setTimeout(r, 2000));
    await send('Runtime.evaluate', {
      expression: 'localStorage.clear(); sessionStorage.clear();'
    });
    // Reload as pure newcomer
    await send('Page.reload');
    await new Promise(r => setTimeout(r, 2500));

    // Check Home
    let check = await send('Runtime.evaluate', {
      expression: `(() => {
        return {
          url: window.location.href,
          hasSidebar: !!document.querySelector('aside'),
          hasSiteHeader: !!document.querySelector('.site-header')
        };
      })()`,
      returnByValue: true
    });
    console.log('Home check (Newcomer):', check.result.value);
    let shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`${outDir}\\test_newcomer_home.png`, Buffer.from(shot.data, 'base64'));

    // 2. Check Rankings
    console.log('Navigating to http://localhost:3000/rankings...');
    await send('Page.navigate', { url: 'http://localhost:3000/rankings' });
    await new Promise(r => setTimeout(r, 2500));

    check = await send('Runtime.evaluate', {
      expression: `(() => {
        return {
          url: window.location.href,
          hasSidebar: !!document.querySelector('aside'),
          hasPublicHeader: !!document.querySelector('header'),
          headerText: document.querySelector('header')?.innerText
        };
      })()`,
      returnByValue: true
    });
    console.log('Rankings check (Newcomer):', check.result.value);
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`${outDir}\\test_newcomer_rankings.png`, Buffer.from(shot.data, 'base64'));

    // 3. Check Tournaments
    console.log('Navigating to http://localhost:3000/tournaments...');
    await send('Page.navigate', { url: 'http://localhost:3000/tournaments' });
    await new Promise(r => setTimeout(r, 2500));

    check = await send('Runtime.evaluate', {
      expression: `(() => {
        return {
          url: window.location.href,
          hasSidebar: !!document.querySelector('aside'),
          hasPublicHeader: !!document.querySelector('header')
        };
      })()`,
      returnByValue: true
    });
    console.log('Tournaments check (Newcomer):', check.result.value);
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`${outDir}\\test_newcomer_tournaments.png`, Buffer.from(shot.data, 'base64'));

    // 4. Check protected page /teams (must redirect to /auth/signin)
    console.log('Navigating to http://localhost:3000/teams (protected)...');
    await send('Page.navigate', { url: 'http://localhost:3000/teams' });
    await new Promise(r => setTimeout(r, 2000));

    check = await send('Runtime.evaluate', {
      expression: `(() => {
        return {
          url: window.location.href,
          isSignInPage: window.location.pathname.includes('/auth/signin')
        };
      })()`,
      returnByValue: true
    });
    console.log('Protected /teams check (Newcomer):', check.result.value);
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`${outDir}\\test_newcomer_teams_redirect.png`, Buffer.from(shot.data, 'base64'));

    // 5. Test Signing In
    console.log('Submitting sign in on /auth/signin...');
    await send('Runtime.evaluate', {
      expression: `(() => {
        const submitBtn = document.querySelector('button[type=\"submit\"]');
        if (submitBtn) submitBtn.click();
      })()`
    });
    await new Promise(r => setTimeout(r, 2500));

    // Check dashboard after signing in
    check = await send('Runtime.evaluate', {
      expression: `(() => {
        return {
          url: window.location.href,
          hasSidebar: !!document.querySelector('aside'),
          sidebarWidth: document.querySelector('aside')?.offsetWidth
        };
      })()`,
      returnByValue: true
    });
    console.log('Signed in check:', check.result.value);
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`${outDir}\\test_signed_in_dashboard.png`, Buffer.from(shot.data, 'base64'));

    // 6. Check /teams as signed in user (should have sidebar and be accessible)
    console.log('Navigating to /teams as authenticated user...');
    await send('Page.navigate', { url: 'http://localhost:3000/teams' });
    await new Promise(r => setTimeout(r, 2000));
    check = await send('Runtime.evaluate', {
      expression: `(() => {
        return {
          url: window.location.href,
          hasSidebar: !!document.querySelector('aside')
        };
      })()`,
      returnByValue: true
    });
    console.log('Authenticated /teams check:', check.result.value);
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`${outDir}\\test_authenticated_teams.png`, Buffer.from(shot.data, 'base64'));

    ws.close();
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    child.kill();
  }
}

main();
