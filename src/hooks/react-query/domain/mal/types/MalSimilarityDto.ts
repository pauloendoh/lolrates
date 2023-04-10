interface MalSimilarityDto {
  id: number;
  usernameA: string;
  usernameB: string;
  animePercentage: number;
  animeCount: number;
  mangaPercentage: number;
  mangaCount: number;
  gender: string;
  location: string;
  birthday: string;
  lastScraped: string;
  friendsScrapedAt?: any;
  imageUrl: string;
  checked: boolean;
  lastOnlineAt: string;
  createdAt: string;
  updatedAt: string;

  sumCount: number;
  avgPercentage: number;
}
