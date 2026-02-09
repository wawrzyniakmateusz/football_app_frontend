export const endpoints = {
    homeLeagues: () => `/api/home_leagues`,

    standings: (leagueId: number, season: number) =>
        `/api/standings/${leagueId}/${season}`,

    topScorers: (leagueId: number, season: number) =>
        `/api/top_players/scorers/${leagueId}/${season}`,

    topAssists: (leagueId: number, season: number) =>
        `/api/top_players/assists/${leagueId}/${season}`,

    topYellow: (leagueId: number, season: number) =>
        `/api/top_players/yellow_cards/${leagueId}/${season}`,

    topRed: (leagueId: number, season: number) =>
        `/api/top_players/red_cards/${leagueId}/${season}`,

    fixtures: (leagueId: number, season: number, roundNumber: number) =>
        `/api/fixtures/${leagueId}/${season}/Regular%20Season%20-%20${roundNumber}`,

    fixtureStats: (fixtureId: number) => `/api/fixtures/stats/${fixtureId}`,

    teamBasic: (teamId: number) => `/api/teams/${teamId}`,

    teamStats: (teamId: number, leagueId: number, season: number) =>
        `/api/teams/stats/${teamId}/${leagueId}/${season}`,

};