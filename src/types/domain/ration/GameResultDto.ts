export interface GameResultDto {
  game_name: string;
  platform: string;
  release_date: string;
  developer: string;
  game_themes: string;
  box_art: string;
  game_url: string;
  total_gamer_count?: number;
  total_critic_count?: number;
  gamerscore?: number;
  criticscore?: number;
  playscore?: number;
  game_id: number;
}
