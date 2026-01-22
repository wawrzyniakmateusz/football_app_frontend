import type {HomeLeague} from "../types/leagues.ts";
import {useEffect, useState} from "react";
import {apiGet} from "../api/client.ts";

type State =
    | { status: "loading"; data: null; error: null }
    | { status: "success"; data: HomeLeague[]; error: null }
    | { status: "error"; data: null; error: string };

export const useHomeLeagues = () => {
    const [state, setState] = useState<State>({
            status: "loading",
            data: null,
            error: null
        });

    useEffect(() => {
        let cancelled = false;

        const run = async () => {
            setState({ status: "loading", data: null, error: null });
            try {
                const data = await apiGet<HomeLeague[]>("/api/home_leagues");
                if (!cancelled) setState({ status: "success", data: data, error: null });
            }
            catch (error) {
                const msg = error instanceof Error ? error.message : "Unknown error";
                if (!cancelled) setState({ status: "error", data: null, error: msg });
            }
        }
        run()

        return () => {
            cancelled = true;
        }
    },[])
    return state;
}