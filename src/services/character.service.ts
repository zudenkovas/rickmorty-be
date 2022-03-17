import axios from 'axios';
import { UserModel } from '../models/user';
import { UserFavoriteCharacterModel } from '../models/favoriteCharacter';
import { getLinkParams } from '../utils/url';

const rickAndMortyApiUrl = 'https://rickandmortyapi.com/api/character/';

const checkUser = async (userId: string): Promise<void> => {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }
};

const getCharacters = async (page: string): Promise<CharacterListResponse> => {
  const { data } = await axios.get<CharacterListResponse>(`${rickAndMortyApiUrl}?page=${page}`);
  const { info, results } = data;

  const nextPage = getLinkParams(info.next, 'page');
  const prevPage = getLinkParams(info.prev, 'page');

  return { info: { ...info, next: nextPage, current: page, prev: prevPage }, results };
};

const getCharacter = async (id: string): Promise<Character> => {
  const { data } = await axios.get<Character>(`${rickAndMortyApiUrl}${id}`);
  return data;
};

const getFavoriteCharactersData = async (userId: string): Promise<UserFavoriteCharacters | null> => {
  await checkUser(userId);
  const userCharactersData = await UserFavoriteCharacterModel.findOne({ userId });
  return userCharactersData;
};

const saveFavoriteCharacterData = async (userId: string, characterIds: string[]): Promise<UserFavoriteCharacters> => {
  await checkUser(userId);

  const userCharactersData = await getFavoriteCharactersData(userId);

  if (!userCharactersData) {
    const savedUserCharactersData = await new UserFavoriteCharacterModel({ userId, characterIds }).save();
    return savedUserCharactersData;
  }

  const updatedCharacterIds = [...new Set([...userCharactersData.characterIds, ...characterIds])];

  const updatedUserCharactersData = await UserFavoriteCharacterModel.findOneAndUpdate(
    { userId },
    { characterIds: updatedCharacterIds },
    { new: true },
  );

  return updatedUserCharactersData;
};

const removeFavoriteCharacterData = async (userId: string, characterIds: string): Promise<UserFavoriteCharacters> => {
  await checkUser(userId);
  const userCharactersData = await getFavoriteCharactersData(userId);

  const updatedCharacterIds = userCharactersData?.characterIds.filter((id) => !characterIds.includes(id));

  const updatedUserCharactersData = await UserFavoriteCharacterModel.findOneAndUpdate(
    { userId },
    { characterIds: updatedCharacterIds },
    { new: true },
  );

  return updatedUserCharactersData;
};

export {
  getCharacters,
  getCharacter,
  getFavoriteCharactersData,
  saveFavoriteCharacterData,
  removeFavoriteCharacterData,
};
