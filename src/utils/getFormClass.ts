export type MatchForm = "W" | "D" | "L";

export const getFormClass = (
    form: MatchForm,
    styles: Record<string, string>
): string => {
    switch (form) {
        case "W":
            return styles.win;
        case "D":
            return styles.draw;
        case "L":
            return styles.loss;
        default:
            return "";
    }
};
