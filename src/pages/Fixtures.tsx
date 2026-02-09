import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useFixtures } from "../hooks/useFixtures";
import { ErrorView } from "../components/ErrorView";
import { friendlyError } from "../utils/errorMessage";
import styles from "./Fixtures.module.css";

const SEASONS = [2022, 2023, 2024] as const;
type Season = (typeof SEASONS)[number];
const DEFAULT_SEASON: Season = 2024;

function isSeason(value: number): value is Season {
    return SEASONS.includes(value as Season);
}

const DEFAULT_ROUND = 1;

const getMaxRounds = (leagueId: number) => {
    if (leagueId === 61 || leagueId === 78) return 34;
    return 38;
};

export const Fixtures = () => {
    const { leagueId } = useParams();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const lid = Number(leagueId);
    const isValidLeagueId = Boolean(leagueId) && !Number.isNaN(lid);

    const seasonRaw = Number(searchParams.get("season") ?? DEFAULT_SEASON);
    const safeSeason: Season = isSeason(seasonRaw) ? seasonRaw : DEFAULT_SEASON;

    const roundRaw = Number(searchParams.get("round") ?? DEFAULT_ROUND);
    const maxRounds = getMaxRounds(isValidLeagueId ? lid : 0);
    const safeRound = Number.isFinite(roundRaw) && roundRaw >= 1 && roundRaw <= maxRounds ? roundRaw : DEFAULT_ROUND;

    const state = useFixtures(isValidLeagueId ? lid : 0, safeSeason, safeRound);

    if (!isValidLeagueId) {
        return (
            <div className={styles.page}>
                <p>Incorrect leagueId.</p>
                <Link to="/" className={styles.backButton}>
                    ← Back
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.topbar}>
                    <div>
                        <button
                            type="button"
                            onClick={() => navigate(`/league/${lid}?season=${safeSeason}`)}
                            className={styles.backButton}
                        >
                            ← Standings
                        </button>
                        <h1 className={styles.title}>Fixtures</h1>
                    </div>

                    <div className={styles.filters}>
                        <label className={styles.label}>
                            <span>Season</span>
                            <select
                                value={safeSeason}
                                onChange={(e) => setSearchParams({ season: e.target.value, round: String(safeRound) })}
                                className={styles.select}
                            >
                                {SEASONS.map((s) => (
                                    <option key={s} value={s}>
                                        {s}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className={styles.label}>
                            <span>Round</span>
                            <select
                                value={safeRound}
                                onChange={(e) => setSearchParams({ season: String(safeSeason), round: e.target.value })}
                                className={styles.select}
                            >
                                {Array.from({ length: maxRounds }, (_, i) => i + 1).map((r) => (
                                    <option key={r} value={r}>
                                        {r}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                </div>

                <div className={styles.content}>
                    {state.status === "loading" && <div className={styles.loading}>Loading fixtures…</div>}

                    {state.status === "error" &&
                        (() => {
                            const f = friendlyError(state.error);
                            return (
                                <ErrorView
                                    title={f.title}
                                    message={f.message}
                                    details={state.error}
                                    onRetry={() => setSearchParams({ season: String(safeSeason), round: String(safeRound) })}
                                    onBack={() => navigate(-1)}
                                />
                            );
                        })()}

                    {state.status === "success" && (
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                Regular Season - {safeRound} ({safeSeason})
                            </div>

                            <div className={styles.tableWrap}>
                                <table className={styles.table}>
                                    <thead>
                                    <tr className={styles.thRow}>
                                        {["Date", "Home", "FT", "Away", "HT", "Stadium", "Details"].map((h) => (
                                            <th key={h} className={styles.th}>
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {state.data.map((m, idx) => (
                                        <tr
                                            key={m.fixture_id}
                                            className={`${styles.tr} ${idx % 2 === 0 ? styles.tr : styles.trAlt}`}
                                        >
                                            <td className={`${styles.td} ${styles.muted}`}>{m.date}</td>
                                            <td className={`${styles.td} ${styles.strong}`}>{m.home_team}</td>
                                            <td className={`${styles.td} ${styles.text}`}>{m.ft_score}</td>
                                            <td className={`${styles.td} ${styles.strong}`}>{m.away_team}</td>
                                            <td className={`${styles.td} ${styles.text}`}>{m.ht_score}</td>
                                            <td className={`${styles.td} ${styles.muted}`}>{m.stadium}</td>
                                            <td className={`${styles.td} ${styles.right}`}>
                                                <button
                                                    type="button"
                                                    onClick={() => navigate(`/fixture/${m.fixture_id}`)}
                                                    className={styles.button}
                                                >
                                                    Details →
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
