import { useNavigate } from "react-router-dom";
import { useHomeLeagues } from "../hooks/useHomeLeagues.ts";
import { ErrorView } from "../components/ErrorView.tsx";
import { friendlyError } from "../utils/errorMessage.ts";
import styles from "./Home.module.css";

export const Home = () => {
    const navigate = useNavigate();
    const state = useHomeLeagues();

    if (state.status === "loading") {
        return <div className={styles.loading}>Loading leagues...</div>;
    }

    if (state.status === "error") {
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
    }

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Football App</h1>
            <p className={styles.subtitle}>Choose league (Europe top 5):</p>

            <div className={styles.grid}>
                {state.data.map((league) => (
                    <button
                        key={league.id}
                        onClick={() => navigate(`/league/${league.id}?season=2024`)}
                        className={styles.leagueButton}
                        type="button"
                    >
                        <div className={styles.leagueName}>{league.name}</div>
                    </button>
                ))}
            </div>
        </div>
    );
};
