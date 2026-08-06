import express, { json } from 'express';
import './config/database';

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(json());

app.get('/api/health', (_, res) => {
  res.json({ status: 'ok', port, mongodb: 'mongodb://localhost:27017/octofit_db' });
});

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
