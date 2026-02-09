import { useEffect, useState } from "react";
import { apiGet } from "../api/client";
import { endpoints } from "../api/endpoints";
import type { TeamBasicInfo, TeamSeasonStats } from "../types/team";

type Data = { basic: TeamBasicInfo; stats: TeamSeasonStats };

type State =
    | { status: "loading"; data: null; error: null }
    | { status: "success"; data: Data; error: null }
    | { status: "error"; data: null; error: string };

export const useTeamDetails = (teamId: number, leagueId: number, season: number) => {
    const [state, setState] = useState<State>({ status: "loading", data: null, error: null });

    useEffect(() => {
        let cancelled = false;

        async function run() {
            setState({ status: "loading", data: null, error: null });
            try {
                const [basic, stats] = await Promise.all([
                    apiGet<TeamBasicInfo>(endpoints.teamBasic(teamId)),
                    apiGet<TeamSeasonStats>(endpoints.teamStats(teamId, leagueId, season)),
                ]);

                if (!cancelled) setState({ status: "success", data: { basic, stats }, error: null });
            } catch (e) {
                const msg = e instanceof Error ? e.message : "Unknown error";
                if (!cancelled) setState({ status: "error", data: null, error: msg });
            }
        }

        if (teamId > 0 && leagueId > 0 && season > 0) run();

        return () => {
            cancelled = true;
        };
    }, [teamId, leagueId, season]);

    return state;
}
