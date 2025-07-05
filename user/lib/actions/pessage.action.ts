"use server";

import { API_URL } from "@/constants";

export async function getPassages(type?: string): Promise<Passage[]> {
    try {
        const url = `${API_URL}/passage/${type ? `?type=${type}` : ''}`;
        const res = await fetch(url, {
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

// Server action to fetch one passage by ID with optional type filter
export async function getPassageByType(type: string): Promise<Passage[] | []> {
    try {
        const url = `${API_URL}/passage/${type}`;
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) return [];
        return await res.json();
    } catch {
        return []
    }
}