import type { StandingRow } from "../types/standings";
import { useNavigate } from "react-router-dom";
import styles from "./StandingsTable.module.css";
import {getFormClass} from "../utils/getFormClass.ts";

export const StandingsTable = ({
                                   rows,
                                   leagueId,
                                   season,
                               }: {
    rows: StandingRow[];
    leagueId: number;
    season: number;
}) => {
    const navigate = useNavigate();

    return (
        <div className={styles.wrap}>
            <table className={styles.table}>
                <thead>
                <tr className={styles.thRow}>
                    {["#", "Team", "P", "W", "D", "L", "Pts", "Form"].map((h) => (
                        <th key={h} className={styles.th}>
                            {h}
                        </th>
                    ))}
                </tr>
                </thead>

                <tbody>
                {rows.map((r, idx) => (
                    <tr key={r.team_id} className={idx % 2 === 0 ? styles.tr : styles.trAlt}>
                        <td className={styles.td}>{r.position}</td>

                        <td className={styles.td}>
                            <button
                                type="button"
                                onClick={() => navigate(`/team/${r.team_id}?leagueId=${leagueId}&season=${season}`)}
                                className={styles.teamButton}
                            >
                                <img src={r.logo} alt={r.team} className={styles.logo} />
                                <span>{r.team}</span>
                            </button>
                        </td>

                        <td className={styles.td}>{r.played}</td>
                        <td className={styles.td}>{r.win}</td>
                        <td className={styles.td}>{r.draw}</td>
                        <td className={styles.td}>{r.lose}</td>

                        <td className={styles.points}>{r.points}</td>

                        <td className={styles.form}>
                            <div className={styles.formWrap}>
                                {r.form.split("").map((char, idx) => (
                                    <div
                                        key={idx}
                                        className={`${styles.formItem} ${getFormClass(char as "W" | "D" | "L", styles)}`}
                                        title={
                                            char === "W" ? "Win" : char === "D" ? "Draw" : "Loss"
                                        }
                                    >
                                        {char}
                                    </div>
                                ))}
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
