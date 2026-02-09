export type TeamStats = {
    team_name: string;
    ball_possession: number;
    expected_goals: number;

    total_shots: number;
    shots_on_goal: number;
    shots_off_goal: number;
    blocked_shots: number;

    corners: number;
    offsides: number;
    fouls: number;

    total_passes: number;
    pass_accuracy: number;

    yellow_cards: number;
    red_cards: number;
};

export type FixtureStatsResponse = {
    fixture_id: number;
    home_team_stats: TeamStats;
    away_team_stats: TeamStats;
};