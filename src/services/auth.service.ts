import express from 'express';
import { sha256 } from 'js-sha256';
import jwt, { VerifyCallback } from 'jsonwebtoken';

import { UserModel } from '../models/user';

declare global {
  namespace Express {
    interface Request {
      currentUserEmail: string;
    }
  }
}

const getSecret = (): string => {
  const secret = 'app-secret';

  if (!secret) {
    console.error('Secret not defined');
    throw new Error('error');
  }

  return secret;
};

const checkUserEmailIsUnique = async (email: string): Promise<void> => {
  const user = await UserModel.findOne({ email }).exec();

  if (user) {
    throw new Error('Email is already taken');
  }
};

const authenticate = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    const verifyCallback: VerifyCallback = (err, verifiedJwt) => {
      if (err) {
        console.error('Invalid token: ', err);
        return res.status(403).json({ error: 'Unauthorized' });
      } else {
        req.currentUserEmail = verifiedJwt?.data;
        next();
      }
    };

    jwt.verify(token, getSecret(), verifyCallback);
  } else {
    res.status(401).json({ error: 'Forbidden' });
  }
};

const createUser = async (user: User): Promise<User> => {
  await checkUserEmailIsUnique(user.email);

  user.password = sha256(user.password);

  const savedUser = await new UserModel(user).save();

  return {
    id: savedUser.id,
    name: savedUser.name,
    email: savedUser.email,
    password: '',
  };
};

const createAccessToken = (data: { id: string; email: string }): string => {
  const tokenLifetime = 86400000;

  return jwt.sign({ data }, getSecret(), { expiresIn: tokenLifetime });
};

const login = async (userLogin: UserLogin): Promise<UserLoginResponse> => {
  const existingUser = await UserModel.findOne({ email: userLogin.email }).exec();

  if (sha256(userLogin.password) === existingUser?.password) {
    const { id, name, email } = existingUser;
    return {
      token: createAccessToken({ id, email }),
      user: { id, name, email },
    };
  } else {
    throw new Error('Invalid credentials');
  }
};

export { authenticate, createUser, login };
