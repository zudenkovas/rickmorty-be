interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface UserLogin {
  email: string;
  password: string;
}

interface UserLoginResponse {
  token: string;
  user: Omit<User, 'password'>;
}

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
  episode: string[];
  url: string[];
  created: string;
}

interface CharacterListResponse {
  info: { count: number; pages: number; current: string; next: string | null; prev: string | null };
  results: Character[];
}

interface UserFavoriteCharacters {
  id: string;
  userId: string;
  characterIds: string[];
}
