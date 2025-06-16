"use client";

import React from "react";
import dynamic from "next/dynamic";
import "plyr/dist/plyr.css";

const Plyr = dynamic(() => import("plyr-react"), { ssr: false });

export default function PassageVideoPlayer({ url }: { url: string }) {
    if (!url) return null;

    // Extract YouTube video ID from URL
    const getYouTubeVideoId = (url: string) => {
        const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    const videoId = getYouTubeVideoId(url);
    
    if (videoId) {
        // For YouTube videos
        return (
            <div className="mb-4">
                <Plyr
                    source={{
                        type: "video",
                        sources: [
                            {
                                src: videoId,
                                provider: "youtube",
                            },
                        ],
                    }}
                    options={{
                        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
                        youtube: { noCookie: false, rel: 0, showinfo: 0, iv_load_policy: 3, modestbranding: 1 }
                    }}
                />
            </div>
        );
    } else {
        // For direct video URLs (mp4, etc.)
        return (
            <div className="mb-4">
                <Plyr
                    source={{
                        type: "video",
                        sources: [
                            {
                                src: url,
                                type: "video/mp4",
                            },
                        ],
                    }}
                    options={{
                        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
                    }}
                />
            </div>
        );
    }
}
