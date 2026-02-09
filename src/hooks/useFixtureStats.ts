import { useEffect, useState } from "react";
import { apiGet } from "../api/client";
import { endpoints } from "../api/endpoints";
import type { FixtureStatsResponse } from "../types/fixtureStats";

type State =
    | { status: "loading"; data: null; error: null }
    | { status: "success"; data: FixtureStatsResponse; error: null }
    | { status: "error"; data: null; error: string };

export const useFixtureStats = (fixtureId: number) => {
    const [state, setState] = useState<State>({ status: "loading", data: null, error: null });

    useEffect(() => {
        let cancelled = false;

        async function run() {
            setState({ status: "loading", data: null, error: null });
            try {
                const data = await apiGet<FixtureStatsResponse>(endpoints.fixtureStats(fixtureId));
                if (!cancelled) setState({ status: "success", data, error: null });
            } catch (e) {
                const msg = e instanceof Error ? e.message : "Unknown error";
                if (!cancelled) setState({ status: "error", data: null, error: msg });
            }
        }

        if (Number.isFinite(fixtureId) && fixtureId > 0) run();

        return () => {
            cancelled = true;
        };
    }, [fixtureId]);

    return state;
}