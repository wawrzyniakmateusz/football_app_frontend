import {useEffect, useState} from "react";
import {apiGet} from "../api/client.ts";
import type {FixtureRow} from "../types/fixtures.ts";
import {endpoints} from "../api/endpoints.ts";

type State =
    | { status: "loading"; data: null; error: null }
    | { status: "success"; data: FixtureRow[]; error: null }
    | { status: "error"; data: null; error: string };

export const useFixtures = (leagueId: number, season: number, roundNumber: number) => {
    const [state, setState] = useState<State>({ status: "loading", data: null, error: null });

    useEffect(() => {
        let cancelled = false;

        async function run() {
            setState({ status: "loading", data: null, error: null });
            try {
                const data = await apiGet<FixtureRow[]>(endpoints.fixtures(leagueId, season, roundNumber));
                if (!cancelled) setState({ status: "success", data, error: null });
            } catch (e) {
                const msg = e instanceof Error ? e.message : "Unknown error";
                if (!cancelled) setState({ status: "error", data: null, error: msg });
            }
        }

        run();
        return () => {
            cancelled = true;
        };
    }, [leagueId, season, roundNumber]);

    return state;
}