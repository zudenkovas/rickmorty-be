import express from 'express';

import * as securityService from '../services/auth.service';

const signUp = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
  try {
    res.json(await securityService.createUser(req.body));
  } catch (err) {
    next(err);
  }
};

const login = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
  try {
    const userLoginResponse = await securityService.login(req.body);
    res.json(userLoginResponse);
  } catch (err) {
    next(err);
  }
};

export { signUp, login };
