import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useTeamDetails } from "../hooks/useTeamDetails";
import { ErrorView } from "../components/ErrorView";
import { friendlyError } from "../utils/errorMessage";
import styles from "./Team.module.css";

const SEASONS = [2022, 2023, 2024] as const;
type Season = (typeof SEASONS)[number];
const DEFAULT_SEASON: Season = 2024;

function isSeason(value: number): value is Season {
    return SEASONS.includes(value as Season);
}

export const Team = () => {
    const { teamId } = useParams();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const tid = Number(teamId);
    const leagueId = Number(searchParams.get("leagueId") ?? 0);

    const seasonRaw = Number(searchParams.get("season") ?? DEFAULT_SEASON);
    const safeSeason: Season = isSeason(seasonRaw) ? seasonRaw : DEFAULT_SEASON;

    const state = useTeamDetails(
        Number.isFinite(tid) ? tid : 0,
        Number.isFinite(leagueId) ? leagueId : 0,
        safeSeason
    );

    if (!Number.isFinite(tid) || tid <= 0 || !Number.isFinite(leagueId) || leagueId <= 0) {
        return (
            <div className={styles.page}>
                <p>Brak teamId lub leagueId w URL.</p>
                <button type="button" onClick={() => navigate(-1)} className={styles.backButtonCard}>
                    ← Back
                </button>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <button type="button" onClick={() => navigate(-1)} className={styles.backLink}>
                    ← Back
                </button>

                <div className={styles.topbar}>
                    <h1 className={styles.title}>Team</h1>

                    <label className={styles.seasonLabel}>
                        <span>Season</span>
                        <select
                            value={safeSeason}
                            onChange={(e) => setSearchParams({ leagueId: String(leagueId), season: e.target.value })}
                            className={styles.select}
                        >
                            {SEASONS.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                {state.status === "loading" && <div className={styles.loading}>Loading team…</div>}

                {state.status === "error" &&
                    (() => {
                        const f = friendlyError(state.error);
                        return (
                            <ErrorView
                                title={f.title}
                                message={f.message}
                                details={state.error}
                                onRetry={() => window.location.reload()}
                                onBack={() => navigate(-1)}
                            />
                        );
                    })()}

                {state.status === "success" && (
                    <>

                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <div className={styles.basicHeaderRow}>
                                    <img src={state.data.basic.logo} alt={state.data.basic.name} width={44} height={44} />
                                    <div>
                                        <div className={styles.teamName}>{state.data.basic.name}</div>
                                        <div className={styles.muted}>
                                            {state.data.basic.country} • Founded {state.data.basic.founded}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.cardBody2}>
                                <div>
                                    <div className={styles.label}>Stadium</div>
                                    <div className={styles.valueStrong}>{state.data.basic.stadium}</div>
                                </div>
                                <div>
                                    <div className={styles.label}>Capacity</div>
                                    <div className={styles.valueStrong}>{state.data.basic.capacity.toLocaleString()}</div>
                                </div>
                            </div>
                        </div>


                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <div className={styles.statsHeaderTitle}>
                                    {state.data.stats.league_name} • Season {state.data.stats.season}
                                </div>
                            </div>

                            <div className={styles.cardBody3}>
                                {[
                                    ["Games", state.data.stats.games_played],
                                    ["Wins", state.data.stats.wins],
                                    ["Draws", state.data.stats.draws],
                                    ["Losses", state.data.stats.loses],
                                    ["Goals scored", state.data.stats.goals_scored],
                                    ["Goals conceded", state.data.stats.goals_conceded],
                                    ["Clean sheets", state.data.stats.clean_sheets],
                                ].map(([label, val]) => (
                                    <div key={label} className={styles.statBox}>
                                        <div className={styles.label}>{label}</div>
                                        <div className={styles.statValue}>{val}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
