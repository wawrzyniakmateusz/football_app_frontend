import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useTeamDetails } from "../hooks/useTeamDetails";
import {ErrorView} from "../components/ErrorView.tsx";
import {friendlyError} from "../utils/errorMessage.ts";

const UI = {
    pageBg: "#121212",
    cardBg: "#1f1f1f",
    headerBg: "#2a2a2a",
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

export const Team = () => {
    const { teamId } = useParams();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const tid = Number(teamId);
    const leagueId = Number(searchParams.get("leagueId") ?? 0);

    const seasonRaw = Number(searchParams.get("season") ?? DEFAULT_SEASON);
    const safeSeason: Season = isSeason(seasonRaw) ? seasonRaw : DEFAULT_SEASON;

    const state = useTeamDetails(Number.isFinite(tid) ? tid : 0, Number.isFinite(leagueId) ? leagueId : 0, safeSeason);

    if (!Number.isFinite(tid) || tid <= 0 || !Number.isFinite(leagueId) || leagueId <= 0) {
        return (
            <div style={{ minHeight: "100vh", background: UI.pageBg, color: UI.text, padding: 16 }}>
                <p>Brak teamId lub leagueId w URL.</p>
                <button
                    onClick={() => navigate(-1)}
                    style={{ border: `1px solid ${UI.border}`, background: UI.cardBg, color: UI.text, padding: "8px 10px", borderRadius: 10, cursor: "pointer" }}
                >
                    ← Back
                </button>
            </div>
        );
    }

    return (
        <div style={{ minHeight: "100vh", background: UI.pageBg, color: UI.text, padding: 16 }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{ border: "none", background: "transparent", color: UI.text, cursor: "pointer", fontWeight: 700, padding: 0 }}
                >
                    ← Back
                </button>

                <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                    <h1 style={{ margin: 0, fontWeight: 900 }}>Team</h1>

                    <label style={{ display: "flex", gap: 8, alignItems: "center", color: UI.text, fontWeight: 700 }}>
                        <span>Season</span>
                        <select
                            value={safeSeason}
                            onChange={(e) => setSearchParams({ leagueId: String(leagueId), season: e.target.value })}
                            style={{
                                padding: "8px 10px",
                                borderRadius: 10,
                                border: `1px solid ${UI.border}`,
                                color: UI.text,
                                background: UI.cardBg,
                            }}
                        >
                            {SEASONS.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                {state.status === "loading" && <div style={{ marginTop: 12 }}>Loading team…</div>}

                {state.status === "error" && (() => {
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
                        {/* Basic card */}
                        <div style={{ marginTop: 12, border: `1px solid ${UI.border}`, borderRadius: 12, overflow: "hidden", background: UI.cardBg }}>
                            <div style={{ background: UI.headerBg, padding: 12, borderBottom: `1px solid ${UI.border}` }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    <img src={state.data.basic.logo} alt={state.data.basic.name} width={44} height={44} />
                                    <div>
                                        <div style={{ fontWeight: 900, fontSize: 18 }}>{state.data.basic.name}</div>
                                        <div style={{ color: UI.muted, fontSize: 13 }}>
                                            {state.data.basic.country} • Founded {state.data.basic.founded}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ padding: 12, display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
                                <div>
                                    <div style={{ color: UI.muted, fontSize: 12 }}>Stadium</div>
                                    <div style={{ fontWeight: 800 }}>{state.data.basic.stadium}</div>
                                </div>
                                <div>
                                    <div style={{ color: UI.muted, fontSize: 12 }}>Capacity</div>
                                    <div style={{ fontWeight: 800 }}>{state.data.basic.capacity.toLocaleString()}</div>
                                </div>
                            </div>
                        </div>

                        {/* Stats card */}
                        <div style={{ marginTop: 12, border: `1px solid ${UI.border}`, borderRadius: 12, overflow: "hidden", background: UI.cardBg }}>
                            <div style={{ background: UI.headerBg, padding: 12, borderBottom: `1px solid ${UI.border}` }}>
                                <div style={{ fontWeight: 900 }}>{state.data.stats.league_name} • Season {state.data.stats.season}</div>
                            </div>

                            <div style={{ padding: 12, display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
                                {[
                                    ["Games", state.data.stats.games_played],
                                    ["Wins", state.data.stats.wins],
                                    ["Draws", state.data.stats.draws],
                                    ["Losses", state.data.stats.loses],
                                    ["Goals scored", state.data.stats.goals_scored],
                                    ["Goals conceded", state.data.stats.goals_conceded],
                                    ["Clean sheets", state.data.stats.clean_sheets],
                                ].map(([label, val]) => (
                                    <div key={label as string} style={{ border: `1px solid ${UI.border}`, borderRadius: 12, padding: 12, background: "#1a1a1a" }}>
                                        <div style={{ color: UI.muted, fontSize: 12 }}>{label}</div>
                                        <div style={{ fontWeight: 900, fontSize: 18 }}>{val as number}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
