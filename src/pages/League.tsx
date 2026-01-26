import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { StandingsTable } from "../components/StandingsTable";
import { useLeagueDashboard } from "../hooks/useLeagueDashboard";
import { TopFiveTable } from "../components/TopFiveTable.tsx";
import { ErrorView } from "../components/ErrorView";
import { friendlyError } from "../utils/errorMessage";

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

const isSeason = (value: number): value is Season => SEASONS.includes(value as Season);

export const League = () => {
    const { leagueId } = useParams();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const lid = Number(leagueId);
    const isValidLeagueId = Boolean(leagueId) && !Number.isNaN(lid);

    const seasonRaw = Number(searchParams.get("season") ?? DEFAULT_SEASON);
    const safeSeason: Season = isSeason(seasonRaw) ? seasonRaw : DEFAULT_SEASON;

    // hook zawsze wywołany (rules of hooks)
    const state = useLeagueDashboard(isValidLeagueId ? lid : 0, safeSeason);

    if (!isValidLeagueId) {
        return (
            <div style={{ minHeight: "100vh", background: UI.pageBg, color: UI.text, padding: 16 }}>
                <p>Niepoprawne leagueId.</p>
                <Link to="/" style={{ color: UI.text }}>
                    ← wróć
                </Link>
            </div>
        );
    }

    return (
        <div style={{ minHeight: "100vh", background: UI.pageBg, color: UI.text, padding: 16 }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                    <div>
                        <Link to="/" style={{ textDecoration: "none", color: UI.text, fontWeight: 700 }}>
                            ← Home
                        </Link>
                        <h1 style={{ margin: "8px 0 0", color: UI.text, fontWeight: 900 }}>Standings</h1>
                    </div>

                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <label style={{ display: "flex", gap: 8, alignItems: "center", color: UI.text, fontWeight: 700 }}>
                            <span>Season</span>
                            <select
                                value={safeSeason}
                                onChange={(e) => setSearchParams({ season: e.target.value })}
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

                        <button
                            onClick={() => navigate(`/league/${lid}/fixtures?season=${safeSeason}`)}
                            style={{
                                padding: "10px 12px",
                                borderRadius: 12,
                                border: `1px solid ${UI.border}`,
                                background: UI.cardBg,
                                color: UI.text,
                                cursor: "pointer",
                                fontWeight: 800,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = UI.headerBg;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = UI.cardBg;
                            }}
                        >
                            Fixtures →
                        </button>
                    </div>
                </div>

                <div style={{ marginTop: 12 }}>
                    {state.status === "loading" && <div style={{ color: UI.text }}>Ładowanie danych…</div>}

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

                            <h2 style={{ marginTop: 18, color: UI.text, fontWeight: 900 }}>Season leaders</h2>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
                                <TopFiveTable title="Top 5 scorers" rows={state.data.scorers} />
                                <TopFiveTable title="Top 5 assists" rows={state.data.assists} />
                                <TopFiveTable title="Top 5 yellow cards" rows={state.data.yellow} />
                                <TopFiveTable title="Top 5 red cards" rows={state.data.red} />
                            </div>

                            <div style={{ marginTop: 10, color: UI.muted, fontSize: 12 }}>
                                League ID: {lid} • Season: {safeSeason}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
