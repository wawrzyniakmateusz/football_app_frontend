import type { TopFiveRow } from "../types/top5";
import styles from "./TopFiveTable.module.css";

export const TopFiveTable = ({ title, rows }: { title: string; rows: TopFiveRow[] }) => {
    return (
        <div className={styles.card}>
            <div className={styles.header}>{title}</div>

            <div className={styles.tableWrap}>
                <table className={styles.table}>
                    <thead>
                    <tr className={styles.thRow}>
                        <th className={styles.thLeft}>Player</th>
                        <th className={styles.thLeft}>Nation</th>
                        <th className={styles.thRight}>Score</th>
                    </tr>
                    </thead>

                    <tbody>
                    {rows.slice(0, 5).map((r, idx) => (
                        <tr key={`${r.player_name}-${r.photo}`} className={idx % 2 === 0 ? styles.tr : styles.trAlt}>
                            <td className={styles.td}>
                                <div className={styles.playerRow}>
                                    <img src={r.photo} alt={r.player_name} className={styles.avatar} />
                                    <div className={styles.playerMeta}>
                                        <span className={styles.playerName}>{r.player_name}</span>
                                        <img src={r.club_logo} alt="club" className={styles.clubLogo} />
                                    </div>
                                </div>
                            </td>

                            <td className={styles.tdMuted}>{r.nationality}</td>

                            <td className={styles.tdRightStrong}>{r.score}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
