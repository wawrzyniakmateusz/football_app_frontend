export const friendlyError = (err: string) => {
    const is502 = err.includes("502") || err.includes("BAD GATEWAY");
    if (is502) {
        return {
            title: "Upstream API limit / temporary error",
            message: "Zewnętrzne API chwilowo odrzuca zapytania (np. limit). Spróbuj ponownie za moment.",
        };
    }

    const is404 = err.includes("404") || err.includes("Not found");
    if (is404) {
        return {
            title: "Not found",
            message: "Nie znaleziono danych dla wybranych parametrów.",
        };
    }

    return {
        title: "Something went wrong",
        message: "Wystąpił błąd podczas pobierania danych.",
    };
}