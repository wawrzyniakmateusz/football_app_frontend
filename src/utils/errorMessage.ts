export const friendlyError = (err: string) => {
    const is502 = err.includes("502") || err.includes("BAD GATEWAY");
    if (is502) {
        return {
            title: "Upstream API limit / temporary error",
            message: "The external API is temporarily rejecting requests (e.g., limit). Please try again later.",
        };
    }

    const is404 = err.includes("404") || err.includes("Not found");
    if (is404) {
        return {
            title: "Not found",
            message: "No data found for the selected parameters.",
        };
    }

    return {
        title: "Something went wrong",
        message: "An error occurred while downloading data.",
    };
}