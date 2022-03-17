import express from 'express';
import { authenticate } from '../services/auth.service';
import {
  getCharacters,
  getCharacter,
  getFavoriteCharacters,
  saveFavoriteCharacters,
  removeFavoriteCharacters,
} from '../controllers/character.controller';

const router = express.Router();

router.route('/').get(authenticate, getCharacters);
router.route('/:id').get(authenticate, getCharacter);
router.route('/favorite/search').post(authenticate, getFavoriteCharacters);
router.route('/favorite/add').post(authenticate, saveFavoriteCharacters);
router.route('/favorite/delete').post(authenticate, removeFavoriteCharacters);

export default router;
