const http = require('http');
const url = require('url');
const {
  state,
  todayKey,
  generateDailyQuests,
  checkInIfNeeded,
  completeQuest,
  claimDailyReward,
  getWeeklyInsights,
  assistantReply,
  recordEvent,
} = require('./dataStore');

const PORT = process.env.PORT || 4000;

function sendJson(res, code, payload) {
  res.writeHead(code, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(JSON.stringify(payload));
}

function parseBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        resolve({});
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url, true);
  const path = parsed.pathname || '/';

  if (req.method === 'OPTIONS') return sendJson(res, 200, { ok: true });

  if (req.method === 'GET' && path === '/health') return sendJson(res, 200, { ok: true });

  if (req.method === 'GET' && path === '/profile') {
    checkInIfNeeded(todayKey());
    recordEvent('profile_opened');
    return sendJson(res, 200, state.user);
  }

  if (req.method === 'GET' && path === '/quests/today') {
    const quests = generateDailyQuests(todayKey());
    return sendJson(res, 200, { date: todayKey(), quests });
  }

  if (req.method === 'POST' && path.startsWith('/quests/') && path.endsWith('/complete')) {
    const questId = path.replace('/quests/', '').replace('/complete', '').replace(/\/$/, '');
    const result = completeQuest(questId, todayKey());
    return sendJson(res, result.ok ? 200 : 400, result);
  }

  if (req.method === 'GET' && path === '/insights/weekly') {
    return sendJson(res, 200, getWeeklyInsights());
  }

  if (req.method === 'POST' && path === '/assistant/message') {
    const body = await parseBody(req);
    recordEvent('assistant_message', { message: body.message || '' });
    return sendJson(res, 200, assistantReply(body.message));
  }

  if (req.method === 'POST' && path === '/rewards/claim') {
    const result = claimDailyReward(todayKey());
    return sendJson(res, result.ok ? 200 : 400, result);
  }

  return sendJson(res, 404, { ok: false, error: 'Not found' });
});

server.listen(PORT, () => {
  console.log(`Mock backend listening on http://localhost:${PORT}`);
});
