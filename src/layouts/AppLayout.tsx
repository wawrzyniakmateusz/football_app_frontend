import type { ReactNode } from "react";
import styles from "./AppLayout.module.css";

export const AppLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className={styles.page}>
            <div className={styles.container}>{children}</div>
        </div>
    );
};