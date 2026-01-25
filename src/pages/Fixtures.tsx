import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useFixtures } from "../hooks/useFixtures";

const UI = {
    pageBg: "#121212",
    cardBg: "#1f1f1f",
    headerBg: "#2a2a2a",
    rowA: "#1f1f1f",
    rowB: "#232323",
    border: "#333",
    text: "#f5f5f5",
    muted: "#bdbdbd",
};

const SEASONS = [2022, 2023, 2024] as const;
type Season = typeof SEASONS[number];
const DEFAULT_SEASON: Season = 2024;

function isSeason(value: number): value is Season {
    return SEASONS.includes(value as Season);
}

const DEFAULT_ROUND = 1;

export const Fixtures = () => {
    const { leagueId } = useParams();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const lid = Number(leagueId);
    const isValidLeagueId = Boolean(leagueId) && !Number.isNaN(lid);

    const seasonRaw = Number(searchParams.get("season") ?? DEFAULT_SEASON);
    const safeSeason: Season = isSeason(seasonRaw) ? seasonRaw : DEFAULT_SEASON;

    const roundRaw = Number(searchParams.get("round") ?? DEFAULT_ROUND);
    const safeRound = Number.isFinite(roundRaw) && roundRaw >= 1 && roundRaw <= 38 ? roundRaw : DEFAULT_ROUND;

    const state = useFixtures(isValidLeagueId ? lid : 0, safeSeason, safeRound);

    if (!isValidLeagueId) {
        return (
            <div style={{ minHeight: "100vh", background: UI.pageBg, color: UI.text, padding: 16 }}>
                <p>Incorrect leagueId.</p>
                <Link to="/" style={{ color: UI.text }}>← Back</Link>
            </div>
        );
    }

    return (
        <div style={{ minHeight: "100vh", background: UI.pageBg, color: UI.text, padding: 16 }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                    <div>
                        <button
                            onClick={() => navigate(`/league/${lid}?season=${safeSeason}`)}
                            style={{
                                border: "none",
                                background: "transparent",
                                cursor: "pointer",
                                padding: 0,
                                color: UI.text,
                                fontWeight: 700,
                            }}
                        >
                            ← Standings
                        </button>
                        <h1 style={{ margin: "8px 0 0", color: UI.text, fontWeight: 900 }}>Fixtures</h1>
                    </div>

                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <label style={{ display: "flex", gap: 8, alignItems: "center", color: UI.text, fontWeight: 700 }}>
                            <span>Season</span>
                            <select
                                value={safeSeason}
                                onChange={(e) => setSearchParams({ season: e.target.value, round: String(safeRound) })}
                                style={{
                                    padding: "8px 10px",
                                    borderRadius: 10,
                                    border: `1px solid ${UI.border}`,
                                    color: UI.text,
                                    background: UI.cardBg,
                                }}
                            >
                                {SEASONS.map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </label>

                        <label style={{ display: "flex", gap: 8, alignItems: "center", color: UI.text, fontWeight: 700 }}>
                            <span>Round</span>
                            <select
                                value={safeRound}
                                onChange={(e) => setSearchParams({ season: String(safeSeason), round: e.target.value })}
                                style={{
                                    padding: "8px 10px",
                                    borderRadius: 10,
                                    border: `1px solid ${UI.border}`,
                                    color: UI.text,
                                    background: UI.cardBg,
                                }}
                            >
                                {Array.from({ length: 38 }, (_, i) => i + 1).map((r) => (
                                    <option key={r} value={r}>{r}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                </div>

                <div style={{ marginTop: 12 }}>
                    {state.status === "loading" && <div style={{ color: UI.text }}>Loading fixtures…</div>}

                    {state.status === "error" && (
                        <div>
                            <h3 style={{ color: UI.text }}>Could not load fixtures</h3>
                            <pre style={{ whiteSpace: "pre-wrap", color: UI.text }}>{state.error}</pre>
                        </div>
                    )}

                    {state.status === "success" && (
                        <div style={{ border: `1px solid ${UI.border}`, borderRadius: 12, overflow: "hidden", background: UI.cardBg }}>
                            <div style={{ padding: 12, background: UI.headerBg, borderBottom: `1px solid ${UI.border}`, color: UI.text, fontWeight: 900 }}>
                                Regular Season - {safeRound} ({safeSeason})
                            </div>

                            <div style={{ overflowX: "auto" }}>
                                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
                                    <thead>
                                    <tr style={{ background: UI.headerBg }}>
                                        {["Date", "Home", "FT", "Away", "HT", "Stadium"].map((h) => (
                                            <th
                                                key={h}
                                                style={{
                                                    textAlign: "left",
                                                    padding: 10,
                                                    borderBottom: `1px solid ${UI.border}`,
                                                    color: UI.text,
                                                    fontWeight: 800,
                                                    fontSize: 13,
                                                }}
                                            >
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {state.data.map((m, idx) => {
                                        const bg = idx % 2 === 0 ? UI.rowA : UI.rowB;

                                        return (
                                            <tr
                                                key={m.fixture_id}
                                                style={{ background: bg }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = "#2f3a46";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = bg;
                                                }}
                                            >
                                                <td style={{ padding: 10, borderBottom: `1px solid ${UI.border}`, color: UI.muted }}>{m.date}</td>
                                                <td style={{ padding: 10, borderBottom: `1px solid ${UI.border}`, color: UI.text, fontWeight: 800 }}>
                                                    {m.home_team}
                                                </td>
                                                <td style={{ padding: 10, borderBottom: `1px solid ${UI.border}`, color: UI.text }}>{m.ft_score}</td>
                                                <td style={{ padding: 10, borderBottom: `1px solid ${UI.border}`, color: UI.text, fontWeight: 800 }}>
                                                    {m.away_team}
                                                </td>
                                                <td style={{ padding: 10, borderBottom: `1px solid ${UI.border}`, color: UI.text }}>{m.ht_score}</td>
                                                <td style={{ padding: 10, borderBottom: `1px solid ${UI.border}`, color: UI.muted }}>{m.stadium}</td>
                                            </tr>
                                        );
                                    })}
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
