import express, { json } from 'express';
import './config/database';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import teamsRouter from './routes/teams';
import usersRouter from './routes/users';
import workoutsRouter from './routes/workouts';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiHost = codespaceName
  ? `${codespaceName}-8000.githubpreview.dev`
  : `localhost:${port}`;

app.use(json());
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/api/health', (_, res) => {
  res.json({
    status: 'ok',
    port,
    apiHost,
    mongodb: 'mongodb://localhost:27017/octofit_db'
  });
});

app.listen(port, () => {
  console.log(`Backend listening on http://${apiHost}`);
});
