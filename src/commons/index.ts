import express from 'express';
import mongoose from 'mongoose';

export const PAGE_SIZE = 20;

export const CORS = (_req: express.Request, res: express.Response, next: express.NextFunction): void => {
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  next();
};

export const connectToMongoDb = (): void => {
  const mongoUrl = 'mongodb://localhost:27017';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const connectionOptions: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose.connect(mongoUrl, connectionOptions);
};
