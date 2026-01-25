import {useNavigate} from "react-router-dom";
import {useHomeLeagues} from "../hooks/useHomeLeagues.ts";

export const Home = () => {
    const navigate = useNavigate();
    const state = useHomeLeagues();

    if (state.status === "loading") return <div style={{ padding: 16 }}>Loading leagues...</div>;

    if (state.status === "error"){
        return (
            <div style={{ padding: 16 }}>
                <h2>You didnt make it...</h2>
                <pre style={{ whiteSpace: "pre-wrap" }}>{state.error}</pre>
            </div>
        );
    }

    return (
        <div style={{ padding: 16, maxWidth: 720, margin: "0 auto" }}>
            <h1 style={{ marginBottom: 8 }}>Football App</h1>
            <p style={{ marginTop: 0, marginBottom: 16 }}>
                Choose league (Europe top 5):
            </p>

            <div style={{ display: "grid", gap: 12 }}>
                {state.data.map((league) => (
                    <button
                        key={league.id}
                        onClick={() => navigate(`/league/${league.id}?season=2024`)}
                        style={{
                            padding: "12px 14px",
                            borderRadius: 12,
                            border: "1px solid #ddd",
                            background: "white",
                            cursor: "pointer",
                            textAlign: "center",
                            color: "black"
                        }}
                    >
                        <div style={{ fontSize: 16, fontWeight: 600 }}>{league.name}</div>
                    </button>
                ))}
            </div>
        </div>
    )
}