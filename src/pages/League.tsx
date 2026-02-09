import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { StandingsTable } from "../components/StandingsTable";
import { useLeagueDashboard } from "../hooks/useLeagueDashboard";
import { TopFiveTable } from "../components/TopFiveTable";
import { ErrorView } from "../components/ErrorView";
import { friendlyError } from "../utils/errorMessage";
import styles from "./League.module.css";

const SEASONS = [2022, 2023, 2024] as const;
type Season = (typeof SEASONS)[number];
const DEFAULT_SEASON: Season = 2024;

const isSeason = (value: number): value is Season => SEASONS.includes(value as Season);

export const League = () => {
    const { leagueId } = useParams();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const lid = Number(leagueId);
    const isValidLeagueId = Boolean(leagueId) && !Number.isNaN(lid);

    const seasonRaw = Number(searchParams.get("season") ?? DEFAULT_SEASON);
    const safeSeason: Season = isSeason(seasonRaw) ? seasonRaw : DEFAULT_SEASON;

    const state = useLeagueDashboard(isValidLeagueId ? lid : 0, safeSeason);

    if (!isValidLeagueId) {
        return (
            <div className={styles.page}>
                <p>Incorrect leagueId.</p>
                <Link to="/" className={styles.backLink}>
                    ← Back
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.topbar}>
                    <div className={styles.left}>
                        <Link to="/" className={styles.backLink}>
                            ← Home
                        </Link>
                        <h1 className={styles.title}>Standings</h1>
                    </div>

                    <div className={styles.actions}>
                        <label className={styles.seasonLabel}>
                            <span>Season</span>
                            <select
                                value={safeSeason}
                                onChange={(e) => setSearchParams({ season: e.target.value })}
                                className={styles.select}
                            >
                                {SEASONS.map((s) => (
                                    <option key={s} value={s}>
                                        {s}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <button
                            type="button"
                            onClick={() => navigate(`/league/${lid}/fixtures?season=${safeSeason}`)}
                            className={styles.button}
                        >
                            Fixtures →
                        </button>
                    </div>
                </div>

                <div className={styles.content}>
                    {state.status === "loading" && <div className={styles.loading}>Loading data...</div>}

                    {state.status === "error" && (() => {
                        const f = friendlyError(state.error);
                        return (
                            <ErrorView
                                title={f.title}
                                message={f.message}
                                details={state.error}
                                onRetry={() => setSearchParams({ season: String(safeSeason) })}
                                onBack={() => navigate(-1)}
                            />
                        );
                    })()}

                    {state.status === "success" && (
                        <>
                            <StandingsTable rows={state.data.standings} leagueId={lid} season={safeSeason} />

                            <h2 className={styles.sectionTitle}>Season leaders</h2>
                            <div className={styles.grid}>
                                <TopFiveTable title="Top 5 scorers" rows={state.data.scorers} />
                                <TopFiveTable title="Top 5 assists" rows={state.data.assists} />
                                <TopFiveTable title="Top 5 yellow cards" rows={state.data.yellow} />
                                <TopFiveTable title="Top 5 red cards" rows={state.data.red} />
                            </div>

                            <div className={styles.meta}>
                                League ID: {lid} • Season: {safeSeason}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
