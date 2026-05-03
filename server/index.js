import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;
const CHATWOOT_URL = process.env.CHATWOOT_URL || 'https://chat.engosoft.com';

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,api_access_token');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// Static files (index.html)
app.use(express.static(join(__dirname, '../public')));

// Proxy → Chatwoot
app.use('/api/v1', createProxyMiddleware({
  target: CHATWOOT_URL,
  changeOrigin: true,
}));

app.listen(PORT, () => console.log(`Running on port ${PORT} → ${CHATWOOT_URL}`));
