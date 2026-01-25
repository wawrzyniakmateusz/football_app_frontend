import type { TopFiveRow } from "../types/top5.ts";

const UI = {
    cardBg: "#1f1f1f",
    headerBg: "#2a2a2a",
    rowA: "#1f1f1f",
    rowB: "#232323",
    border: "#333",
    text: "#f5f5f5",
    muted: "#bdbdbd",
};

export const TopFiveTable = ({ title, rows }: { title: string; rows: TopFiveRow[] }) => {
    return (
        <div style={{ border: `1px solid ${UI.border}`, borderRadius: 12, overflow: "hidden", background: UI.cardBg }}>
            <div
                style={{
                    padding: 12,
                    fontWeight: 900,
                    background: UI.headerBg,
                    borderBottom: `1px solid ${UI.border}`,
                    color: UI.text,
                    textAlign: "center",
                    letterSpacing: 0.2,
                }}
            >
                {title}
            </div>

            <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 420 }}>
                    <thead>
                    <tr style={{ background: UI.headerBg }}>
                        <th style={{ textAlign: "left", padding: 10, borderBottom: `1px solid ${UI.border}`, color: UI.text, fontWeight: 800, fontSize: 13 }}>
                            Player
                        </th>
                        <th style={{ textAlign: "left", padding: 10, borderBottom: `1px solid ${UI.border}`, color: UI.text, fontWeight: 800, fontSize: 13 }}>
                            Nation
                        </th>
                        <th style={{ textAlign: "right", padding: 10, borderBottom: `1px solid ${UI.border}`, color: UI.text, fontWeight: 800, fontSize: 13 }}>
                            Score
                        </th>
                    </tr>
                    </thead>

                    <tbody>
                    {rows.slice(0, 5).map((r, idx) => {
                        const bg = idx % 2 === 0 ? UI.rowA : UI.rowB;

                        return (
                            <tr
                                key={`${r.player_name}-${r.photo}`}
                                style={{ background: bg }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "#2f3a46";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = bg;
                                }}
                            >
                                <td style={{ padding: 10, borderBottom: `1px solid ${UI.border}`, color: UI.text }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                        <img src={r.photo} alt={r.player_name} width={28} height={28} style={{ borderRadius: "50%" }} />
                                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                            <span style={{ fontWeight: 700 }}>{r.player_name}</span>
                                            <img src={r.club_logo} alt="club" width={18} height={18} />
                                        </div>
                                    </div>
                                </td>

                                <td style={{ padding: 10, borderBottom: `1px solid ${UI.border}`, color: UI.muted, fontWeight: 600 }}>
                                    {r.nationality}
                                </td>

                                <td style={{ padding: 10, borderBottom: `1px solid ${UI.border}`, textAlign: "right", color: UI.text, fontWeight: 900 }}>
                                    {r.score}
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
