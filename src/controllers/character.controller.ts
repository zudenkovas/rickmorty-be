import express from 'express';

import * as characterService from '../services/character.service';

const getCharacters = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  try {
    const page = (req.query.page as string) || '1';
    res.json(await characterService.getCharacters(page));
  } catch (err) {
    next(err);
  }
};

const getCharacter = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
  try {
    res.json(await characterService.getCharacter(req.params.id));
  } catch (err) {
    next(err);
  }
};

const getFavoriteCharacters = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  try {
    const { userId } = req.body;
    res.json(await characterService.getFavoriteCharactersData(userId));
  } catch (err) {
    next(err);
  }
};

const saveFavoriteCharacters = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  try {
    const { userId, characterIds } = req.body;
    res.json(await characterService.saveFavoriteCharacterData(userId, characterIds));
  } catch (err) {
    next(err);
  }
};

const removeFavoriteCharacters = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  try {
    const { userId, characterIds } = req.body;
    res.json(await characterService.removeFavoriteCharacterData(userId, characterIds));
  } catch (err) {
    next(err);
  }
};

export { getCharacters, getCharacter, getFavoriteCharacters, saveFavoriteCharacters, removeFavoriteCharacters };
