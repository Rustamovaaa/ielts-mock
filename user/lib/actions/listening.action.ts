import { API_URL } from "@/constants";

export async function getListeningPassages(): Promise<Passage[]> {
    try {
        // During build time, API might not be available, return empty array
        if (!API_URL) {
            console.warn("API_URL not defined, returning empty array for build");
            return [];
        }
        
        const res = await fetch(`${API_URL}/passage?type=listening`, {
            next: {
                tags: ["passage"],
            },
            cache: 'no-store', // Don't cache during build
        });
        if (!res.ok) {
            console.warn("Failed to fetch listening passages, returning empty array");
            return [];
        }
        return await res.json();
    } catch (error) {
        console.warn("Error fetching listening passages:", error);
        return []; // Return empty array instead of throwing error
    }
}
