import React from "react";
import { notFound } from "next/navigation";

async function getPassage(passageId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/passage/${passageId}`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;  return res.json();
}

interface ListeningViewPageProps {
  params: Promise<{ passageId: string }>;
}

export default async function ListeningViewPage({
  params,
}: ListeningViewPageProps) {
  const { passageId } = await params;
  const passage = await getPassage(passageId);
  if (!passage || passage.type !== 'listening') return notFound();
  
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-green-700">{passage.title}</h1>
      <div className="mb-2 text-gray-500">{passage.description}</div>
      
      {passage.videoUrl && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Video</h3>
          <video
            src={passage.videoUrl}
            controls
            className="mb-4 rounded-xl max-h-60 w-full"
          />
        </div>
      )}
      
      {passage.audioUrl && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Audio</h3>
          <audio controls className="w-full">
            <source src={passage.audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
      
      {passage.imageUrl && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Image</h3>
          <img
            src={passage.imageUrl}
            alt="Listening test"
            className="mb-4 rounded-xl max-h-60"
          />
        </div>
      )}
      
      {passage.content && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Instructions</h3>
          <div
            className="prose mb-4"
            dangerouslySetInnerHTML={{ __html: passage.content || "" }}
          />
        </div>
      )}
      
      <div className="text-xs text-gray-400 mt-6">
        Created: {new Date(passage.createdAt).toLocaleString()}
      </div>
    </div>
  );
}
