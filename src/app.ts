import express, { ErrorRequestHandler, json } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import sanitize from 'express-mongo-sanitize';

import { connectToMongoDb, CORS } from './commons';
import healthRoutes from './routes/health.routes';
import authRoutes from './routes/auth.routes';
import characterRoutes from './routes/character.routes';

dotenv.config();

connectToMongoDb();

const app = express();

app.use(helmet());
app.use(json());
app.use(CORS);
app.use(sanitize());

app.use('/auth', authRoutes);
app.use('/health', healthRoutes);
app.use('/characters', characterRoutes);

const errorLogger: ErrorRequestHandler = (err, _req, _res, next) => {
  console.error(err.stack);
  next(err);
};
app.use(errorLogger);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  res.status(500).json({ error: err.errors || err.message || 'Unknown Error' });
};
app.use(errorHandler);

app.use((_req: express.Request, res: express.Response) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(3001, () => {
  console.log('Application is started');
});

export default app;
