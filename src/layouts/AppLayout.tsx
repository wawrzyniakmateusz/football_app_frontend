import type {ReactNode} from "react";

const UI = {
    pageBg: "#121212",
};

export const AppLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div
            style={{
                minHeight: "100vh",
                background: UI.pageBg,
                display: "flex",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: 1100,
                    padding: 16,
                }}
            >
                {children}
            </div>
        </div>
    )
}