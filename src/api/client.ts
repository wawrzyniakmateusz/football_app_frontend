const BASE_URL = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:5000";

export async function apiGet<T>(path: string): Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`);

    if (!res.ok) {
        let details: unknown = null;
        try {
            details = await res.json();
        } catch {
            // ignore
        }
        const msg = `Request failed: ${res.status} ${res.statusText}`;
        throw new Error(details ? `${msg} | ${JSON.stringify(details)}` : msg);
    }

    return (await res.json()) as T;
}