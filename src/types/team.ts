export type TeamBasicInfo = {
    id: number;
    name: string;
    country: string;
    founded: number;
    logo: string;
    stadium: string;
    capacity: number;
};

export type TeamSeasonStats = {
    league_name: string;
    season: number;
    name: string;
    id: number;
    logo: string;
    games_played: number;
    wins: number;
    loses: number;
    draws: number;
    goals_scored: number;
    goals_conceded: number;
    clean_sheets: number;
};
