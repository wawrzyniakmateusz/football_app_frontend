import { useNavigate, useParams } from "react-router-dom";
import { useFixtureStats } from "../hooks/useFixtureStats";

const UI = {
    pageBg: "#121212",
    cardBg: "#1f1f1f",
    headerBg: "#2a2a2a",
    border: "#333",
    text: "#f5f5f5",
    muted: "#bdbdbd",
};

const StatRow = ({ label, home, away }: { label: string; home: number | string; away: number | string }) => {
    return (
        <tr>
            <td style={{ padding: 10, borderBottom: `1px solid ${UI.border}`, color: UI.muted }}>{label}</td>
            <td style={{ padding: 10, borderBottom: `1px solid ${UI.border}`, color: UI.text, fontWeight: 800, textAlign: "right" }}>
                {home}
            </td>
            <td style={{ padding: 10, borderBottom: `1px solid ${UI.border}`, color: UI.text, fontWeight: 800, textAlign: "right" }}>
                {away}
            </td>
        </tr>
    );
}

export const FixtureDetails = ()=> {
    const { fixtureId } = useParams();
    const id = Number(fixtureId);

    const state = useFixtureStats(Number.isFinite(id) ? id : 0);
    const navigate = useNavigate();

    return (
        <div style={{ minHeight: "100vh", background: UI.pageBg, color: UI.text, padding: 16 }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        border: "none",
                        background: "transparent",
                        color: UI.text,
                        cursor: "pointer",
                        fontWeight: 700,
                        padding: 0,
                    }}
                >
                    ← Back
                </button>

                <h1 style={{ margin: "10px 0 0", fontWeight: 900 }}>Match details</h1>

                {state.status === "loading" && <div style={{ marginTop: 12 }}>Loading stats…</div>}

                {state.status === "error" && (
                    <div style={{ marginTop: 12 }}>
                        <h3 style={{ margin: 0 }}>Could not load match stats</h3>
                        <pre style={{ whiteSpace: "pre-wrap" }}>{state.error}</pre>
                    </div>
                )}

                {state.status === "success" && (
                    <div style={{ marginTop: 12, border: `1px solid ${UI.border}`, borderRadius: 12, overflow: "hidden", background: UI.cardBg }}>
                        <div style={{ background: UI.headerBg, padding: 12, borderBottom: `1px solid ${UI.border}` }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                                <div style={{ fontWeight: 900 }}>
                                    {state.data.home_team_stats.team_name} vs {state.data.away_team_stats.team_name}
                                </div>
                                <div style={{ color: UI.muted, fontSize: 12 }}>Fixture ID: {state.data.fixture_id}</div>
                            </div>
                        </div>

                        <div style={{ overflowX: "auto" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 520 }}>
                                <thead>
                                <tr style={{ background: UI.headerBg }}>
                                    <th style={{ padding: 10, textAlign: "left", borderBottom: `1px solid ${UI.border}`, color: UI.text, fontWeight: 800, fontSize: 13 }}>
                                        Stat
                                    </th>
                                    <th style={{ padding: 10, textAlign: "right", borderBottom: `1px solid ${UI.border}`, color: UI.text, fontWeight: 800, fontSize: 13 }}>
                                        {state.data.home_team_stats.team_name}
                                    </th>
                                    <th style={{ padding: 10, textAlign: "right", borderBottom: `1px solid ${UI.border}`, color: UI.text, fontWeight: 800, fontSize: 13 }}>
                                        {state.data.away_team_stats.team_name}
                                    </th>
                                </tr>
                                </thead>

                                <tbody>
                                <StatRow label="Ball possession (%)" home={state.data.home_team_stats.ball_possession} away={state.data.away_team_stats.ball_possession} />
                                <StatRow label="Expected goals (xG)" home={state.data.home_team_stats.expected_goals} away={state.data.away_team_stats.expected_goals} />
                                <StatRow label="Total shots" home={state.data.home_team_stats.total_shots} away={state.data.away_team_stats.total_shots} />
                                <StatRow label="Shots on goal" home={state.data.home_team_stats.shots_on_goal} away={state.data.away_team_stats.shots_on_goal} />
                                <StatRow label="Shots off goal" home={state.data.home_team_stats.shots_off_goal} away={state.data.away_team_stats.shots_off_goal} />
                                <StatRow label="Blocked shots" home={state.data.home_team_stats.blocked_shots} away={state.data.away_team_stats.blocked_shots} />
                                <StatRow label="Corners" home={state.data.home_team_stats.corners} away={state.data.away_team_stats.corners} />
                                <StatRow label="Offsides" home={state.data.home_team_stats.offsides} away={state.data.away_team_stats.offsides} />
                                <StatRow label="Fouls" home={state.data.home_team_stats.fouls} away={state.data.away_team_stats.fouls} />
                                <StatRow label="Total passes" home={state.data.home_team_stats.total_passes} away={state.data.away_team_stats.total_passes} />
                                <StatRow label="Pass accuracy (%)" home={state.data.home_team_stats.pass_accuracy} away={state.data.away_team_stats.pass_accuracy} />
                                <StatRow label="Yellow cards" home={state.data.home_team_stats.yellow_cards} away={state.data.away_team_stats.yellow_cards} />
                                <StatRow label="Red cards" home={state.data.home_team_stats.red_cards} away={state.data.away_team_stats.red_cards} />
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}