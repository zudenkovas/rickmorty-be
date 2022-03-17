import mongoose from 'mongoose';

const UserFavoriteCharacterSchema = new mongoose.Schema<UserFavoriteCharacters>({
  userId: {
    type: String,
    required: true,
  },
  characterIds: {
    type: [String],
    required: true,
  },
});

export const UserFavoriteCharacterModel = mongoose.model<UserFavoriteCharacters>(
  'favorite-characters',
  UserFavoriteCharacterSchema,
);
