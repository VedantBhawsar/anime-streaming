// export interface IAnimeData {
//   spotlightAnimes: SpotlightAnime[];
//   trendingAnimes: IAnime[];
//   latestEpisodeAnimes: LatestCompletedAnime[];
//   topUpcomingAnimes: TopUpcomingAnime[];
//   top10Animes: Top10Animes;
//   topAiringAnimes: LatestCompletedAnime[];
//   mostPopularAnimes: IAnime[];
//   mostFavoriteAnimes: IAnime[];
//   latestCompletedAnimes: LatestCompletedAnime[];
//   genres: string[];
// }

export interface Episodes {
  sub: number | null;
  dub: number | null;
}

export enum Type {
  Movie = "Movie",
  Ona = "ONA",
  Tv = "TV",
}

enum ISubOrDub {
  "sub",
  "dub",
  "both",
}

export interface IAnime {
  dub: number;
  duration: string;
  episodes: any;
  id: string;
  image: string;
  japaneseTitle: string;
  nsfw: boolean;
  sub: number;
  title: string;
  type: string;
  url: string;
  description?: string;
  totalEpisodes?: number;
  subOrDub?: ISubOrDub;
  originalTitle?: string;
  hasSub: boolean;
}

export interface ISuggestionAnime extends IAnime {
  moreInfo: string[];
}

export interface SpotlightAnime {
  rank: number;
  id: string;
  name: string;
  description: string;
  poster: string;
  jname: string;
  episodes: Episodes;
  type: Type;
  otherInfo: string[];
}

// export interface Top10Animes {
//   today: LatestCompletedAnime[];
//   week: IAnime[];
//   month: LatestCompletedAnime[];
// }

export interface TopUpcomingAnime {
  id: string;
  name: string;
  jname: string;
  poster: string;
  duration: string;
  type: string;
  rating: null | string;
  episodes: Episodes;
}

export type AnimeMetadata = {
  title: string;
  originalTitle: string;
  studio: string;
  genre: string[];
  episodes: number;
  status: string;
  rating: number;
  description: string;
  coverImage: string;
};

export type EpisodeInfo = {
  id: number;
  number: number;
  title: string;
  duration: string;
  releaseDate: string;
  thumbnail: string;
};

export type CommentType = {
  id: number;
  username: string;
  avatar: string;
  content: string;
  likes: number;
  timestamp: string;
};
