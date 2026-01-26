type Props = {
    title: string;
    message?: string;
    details?: string;
    onRetry?: () => void;
    onBack?: () => void;
};

const UI = {
    cardBg: "#1f1f1f",
    headerBg: "#2a2a2a",
    border: "#333",
    text: "#f5f5f5",
    muted: "#bdbdbd",
};

export const ErrorView = ({ title, message, details, onRetry, onBack }: Props) => {
    return (
        <div
            style={{
                marginTop: 12,
                border: `1px solid ${UI.border}`,
                borderRadius: 12,
                overflow: "hidden",
                background: UI.cardBg,
            }}
        >
            <div style={{ background: UI.headerBg, padding: 12, borderBottom: `1px solid ${UI.border}` }}>
                <div style={{ fontWeight: 900, color: UI.text }}>{title}</div>
                {message && <div style={{ marginTop: 6, color: UI.muted, fontSize: 13 }}>{message}</div>}
            </div>

            <div style={{ padding: 12 }}>
                {details && (
                    <pre style={{ whiteSpace: "pre-wrap", margin: "0 0 12px", color: UI.muted, fontSize: 12 }}>
            {details}
          </pre>
                )}

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {onRetry && (
                        <button
                            onClick={onRetry}
                            style={{
                                padding: "10px 12px",
                                borderRadius: 12,
                                border: `1px solid ${UI.border}`,
                                background: UI.cardBg,
                                color: UI.text,
                                cursor: "pointer",
                                fontWeight: 800,
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = UI.headerBg)}
                            onMouseLeave={(e) => (e.currentTarget.style.background = UI.cardBg)}
                        >
                            Retry
                        </button>
                    )}

                    {onBack && (
                        <button
                            onClick={onBack}
                            style={{
                                padding: "10px 12px",
                                borderRadius: 12,
                                border: `1px solid ${UI.border}`,
                                background: "transparent",
                                color: UI.text,
                                cursor: "pointer",
                                fontWeight: 800,
                            }}
                        >
                            Back
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}