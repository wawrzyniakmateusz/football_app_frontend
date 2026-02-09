import styles from "./ErrorView.module.css";

type Props = {
    title: string;
    message?: string;
    details?: string;
    onRetry?: () => void;
    onBack?: () => void;
};



export const ErrorView = ({ title, message, details, onRetry, onBack }: Props) => {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <div className={styles.title}>{title}</div>
                {message && <div className={styles.message}>{message}</div>}
            </div>

            <div className={styles.body}>
                {details && <pre className={styles.details}>{details}</pre>}

                <div className={styles.actions}>
                    {onRetry && (
                        <button type="button" onClick={onRetry} className={`${styles.button} ${styles.retry}`}>
                            Retry
                        </button>
                    )}

                    {onBack && (
                        <button type="button" onClick={onBack} className={`${styles.button} ${styles.back}`}>
                            Back
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
