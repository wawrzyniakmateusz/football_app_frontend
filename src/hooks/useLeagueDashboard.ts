import type {StandingRow} from "../types/standings.ts";
import type {TopFiveRow} from "../types/top5.ts";
import {useEffect, useState} from "react";
import {apiGet} from "../api/client.ts";
import {endpoints} from "../api/endpoints.ts";

type DashboardData = {
    standings: StandingRow[]
    scorers: TopFiveRow[]
    assists: TopFiveRow[]
    yellow: TopFiveRow[]
    red: TopFiveRow[]
}

type State =
    | { status: "loading"; data: null; error: null }
    | { status: "success"; data: DashboardData; error: null }
    | { status: "error"; data: null; error: string };

export const useLeagueDashboard = (leagueId: number, season: number) => {
    const [state, setState] = useState<State>({
        status: "loading",
        data: null,
        error: null
    })

    useEffect(() => {
        let cancelled = false;

        async function run() {
            setState({ status: "loading", data: null, error: null });

            try {
                const [standings, scorers, assists, yellow, red] = await Promise.all([
                    apiGet<StandingRow[]>(endpoints.standings(leagueId, season)),
                    apiGet<TopFiveRow[]>(endpoints.topScorers(leagueId, season)),
                    apiGet<TopFiveRow[]>(endpoints.topAssists(leagueId, season)),
                    apiGet<TopFiveRow[]>(endpoints.topYellow(leagueId, season)),
                    apiGet<TopFiveRow[]>(endpoints.topRed(leagueId, season)),
                ]);

                if (!cancelled) {
                    setState({
                        status: "success",
                        data: { standings, scorers, assists, yellow, red },
                        error: null,
                    });
                }
            } catch (e) {
                const msg = e instanceof Error ? e.message : "Unknown error";
                if (!cancelled) setState({ status: "error", data: null, error: msg });
            }
        }

        run();
        return () => {
            cancelled = true;
        };
    }, [leagueId, season]);

    return state;
}