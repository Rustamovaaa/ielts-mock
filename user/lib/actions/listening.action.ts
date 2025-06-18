import { API_URL } from "@/constants";

export async function getListeningPassages(): Promise<Passage[]> {
    try {
        const res = await fetch(`${API_URL}/passage?type=listening`, {
            next: {
                tags: ["passage"],
            },
        });
        if (!res.ok) throw new Error("Not found");
        return await res.json();
    } catch {
        throw new Error("Failed to fetch listening passages");
    }
}
