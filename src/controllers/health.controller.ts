import express from 'express';
import mongoose from 'mongoose';

const getHealth = (_req: express.Request, res: express.Response): void => {
  res.json({
    health: true,
    version: 'v0.4',
    mongo: mongoose.connection.readyState > 0,
  });
};

export { getHealth };
