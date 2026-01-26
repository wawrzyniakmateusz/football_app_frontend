import type { StandingRow } from "../types/standings";
import {useNavigate} from "react-router-dom";

const UI = {
    cardBg: "#1f1f1f",
    headerBg: "#2a2a2a",
    rowA: "#1f1f1f",
    rowB: "#232323",
    border: "#333",
    text: "#f5f5f5",
    muted: "#bdbdbd",
};

export const StandingsTable = ({ rows, leagueId, season }: { rows: StandingRow[]; leagueId: number; season: number }) => {
    const navigate = useNavigate()
    return (
        <div
            style={{
                overflowX: "auto",
                border: `1px solid ${UI.border}`,
                borderRadius: 12,
                background: UI.cardBg,
            }}
        >
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 760 }}>
                <thead>
                <tr style={{ background: UI.headerBg }}>
                    {["#", "Team", "P", "W", "D", "L", "Pts", "Form"].map((h) => (
                        <th
                            key={h}
                            style={{
                                textAlign: "left",
                                padding: 10,
                                borderBottom: `1px solid ${UI.border}`,
                                color: UI.text,
                                fontWeight: 800,
                                fontSize: 13,
                                letterSpacing: 0.2,
                            }}
                        >
                            {h}
                        </th>
                    ))}
                </tr>
                </thead>

                <tbody>
                {rows.map((r, idx) => {
                    const bg = idx % 2 === 0 ? UI.rowA : UI.rowB;

                    return (
                        <tr
                            key={r.team_id}
                            style={{ background: bg }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "#2f3a46";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = bg;
                            }}
                        >
                            <td style={{ padding: 10, borderBottom: `1px solid ${UI.border}`, color: UI.text }}>
                                {r.position}
                            </td>

                            <td style={{ padding: 10, borderBottom: `1px solid ${UI.border}`, color: UI.text }}>
                                <button
                                    onClick={() => navigate(`/team/${r.team_id}?leagueId=${leagueId}&season=${season}`)}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                        border: "none",
                                        background: "transparent",
                                        color: UI.text,
                                        cursor: "pointer",
                                        padding: 0,
                                        fontWeight: 700,
                                    }}
                                >
                                    <img src={r.logo} alt={r.team} width={22} height={22} style={{ display: "block" }} />
                                    <span>{r.team}</span>
                                </button>
                            </td>


                            <td style={{ padding: 10, borderBottom: `1px solid ${UI.border}`, color: UI.text }}>{r.played}</td>
                            <td style={{ padding: 10, borderBottom: `1px solid ${UI.border}`, color: UI.text }}>{r.win}</td>
                            <td style={{ padding: 10, borderBottom: `1px solid ${UI.border}`, color: UI.text }}>{r.draw}</td>
                            <td style={{ padding: 10, borderBottom: `1px solid ${UI.border}`, color: UI.text }}>{r.lose}</td>

                            <td style={{ padding: 10, borderBottom: `1px solid ${UI.border}`, color: UI.text, fontWeight: 800 }}>
                                {r.points}
                            </td>

                            <td
                                style={{
                                    padding: 10,
                                    borderBottom: `1px solid ${UI.border}`,
                                    color: UI.muted,
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                }}
                            >
                                {r.form}
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};