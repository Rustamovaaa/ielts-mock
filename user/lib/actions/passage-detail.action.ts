import { API_URL } from "@/constants";

export async function getPassageWithQuestions(id: string): Promise<Passage & { questions: Question[] }> {
    try {
        const res = await fetch(`${API_URL}/passage/${id}`, {
            cache: "no-store",
        });
        if (!res.ok) throw new Error("Not found");
        return await res.json();
    } catch {
        throw new Error("Failed to fetch passage");
    }
}
