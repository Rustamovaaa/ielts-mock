"use server";

import { API_URL } from "@/constants";

export async function getPassages(): Promise<Passage[]> {
    try {
        const res = await fetch(`${API_URL}/passage`, {
            next: {
                tags: ["passage"],
            }
        });
        if (!res.ok) return [];
        return await res.json();
    } catch {
        return [];
    }
}