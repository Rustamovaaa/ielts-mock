import { API_URL } from "@/constants";

export async function getPassageWithQuestions(id: string): Promise<Passage & { questions: Question[] } | null> {
    try {
        // During build time, API might not be available
        if (!API_URL) {
            console.warn("API_URL not defined during build");
            return null;
        }
        
        const res = await fetch(`${API_URL}/passage/${id}`, {
            cache: "no-store",
        });
        if (!res.ok) {
            console.warn(`Failed to fetch passage ${id}`);
            return null;
        }
        return await res.json();
    } catch (error) {
        console.warn("Error fetching passage:", error);
        return null; // Return null instead of throwing error
    }
}
