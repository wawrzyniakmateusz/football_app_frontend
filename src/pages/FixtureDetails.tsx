import { useNavigate, useParams } from "react-router-dom";
import { useFixtureStats } from "../hooks/useFixtureStats";
import { friendlyError } from "../utils/errorMessage";
import { ErrorView } from "../components/ErrorView";
import styles from "./FixtureDetails.module.css";

const StatRow = ({
                     label,
                     home,
                     away,
                 }: {
    label: string;
    home: number | string;
    away: number | string;
}) => {
    return (
        <tr>
            <td className={styles.tdLabel}>{label}</td>
            <td className={styles.tdValue}>{home}</td>
            <td className={styles.tdValue}>{away}</td>
        </tr>
    );
};

export const FixtureDetails = () => {
    const { fixtureId } = useParams();
    const id = Number(fixtureId);

    const state = useFixtureStats(Number.isFinite(id) ? id : 0);
    const navigate = useNavigate();

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <button type="button" onClick={() => navigate(-1)} className={styles.backButton}>
                    ← Back
                </button>

                <h1 className={styles.title}>Match details</h1>

                {state.status === "loading" && <div className={styles.loading}>Loading stats…</div>}

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
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div className={styles.headerRow}>
                                <div className={styles.matchTitle}>
                                    {state.data.home_team_stats.team_name} vs {state.data.away_team_stats.team_name}
                                </div>
                                <div className={styles.meta}>Fixture ID: {state.data.fixture_id}</div>
                            </div>
                        </div>

                        <div className={styles.tableWrap}>
                            <table className={styles.table}>
                                <thead>
                                <tr className={styles.thRow}>
                                    <th className={styles.thLeft}>Stat</th>
                                    <th className={styles.thRight}>{state.data.home_team_stats.team_name}</th>
                                    <th className={styles.thRight}>{state.data.away_team_stats.team_name}</th>
                                </tr>
                                </thead>

                                <tbody>
                                <StatRow
                                    label="Ball possession (%)"
                                    home={state.data.home_team_stats.ball_possession}
                                    away={state.data.away_team_stats.ball_possession}
                                />
                                <StatRow
                                    label="Expected goals (xG)"
                                    home={state.data.home_team_stats.expected_goals}
                                    away={state.data.away_team_stats.expected_goals}
                                />
                                <StatRow
                                    label="Total shots"
                                    home={state.data.home_team_stats.total_shots}
                                    away={state.data.away_team_stats.total_shots}
                                />
                                <StatRow
                                    label="Shots on goal"
                                    home={state.data.home_team_stats.shots_on_goal}
                                    away={state.data.away_team_stats.shots_on_goal}
                                />
                                <StatRow
                                    label="Shots off goal"
                                    home={state.data.home_team_stats.shots_off_goal}
                                    away={state.data.away_team_stats.shots_off_goal}
                                />
                                <StatRow
                                    label="Blocked shots"
                                    home={state.data.home_team_stats.blocked_shots}
                                    away={state.data.away_team_stats.blocked_shots}
                                />
                                <StatRow label="Corners" home={state.data.home_team_stats.corners} away={state.data.away_team_stats.corners} />
                                <StatRow label="Offsides" home={state.data.home_team_stats.offsides} away={state.data.away_team_stats.offsides} />
                                <StatRow label="Fouls" home={state.data.home_team_stats.fouls} away={state.data.away_team_stats.fouls} />
                                <StatRow
                                    label="Total passes"
                                    home={state.data.home_team_stats.total_passes}
                                    away={state.data.away_team_stats.total_passes}
                                />
                                <StatRow
                                    label="Pass accuracy (%)"
                                    home={state.data.home_team_stats.pass_accuracy}
                                    away={state.data.away_team_stats.pass_accuracy}
                                />
                                <StatRow
                                    label="Yellow cards"
                                    home={state.data.home_team_stats.yellow_cards}
                                    away={state.data.away_team_stats.yellow_cards}
                                />
                                <StatRow label="Red cards" home={state.data.home_team_stats.red_cards} away={state.data.away_team_stats.red_cards} />
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
