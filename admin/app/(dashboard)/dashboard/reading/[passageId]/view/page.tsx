import React from "react";
import { notFound } from "next/navigation";

async function getPassage(passageId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/passage/${passageId}`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  return res.json();
}

export default async function PassageViewPage({
  params,
}: {
  params: { passageId: string } | Promise<{ passageId: string }>;
}) {
  let passageId: string;
  if (typeof (params as any).then === "function") {
    params = await params;
  }
  passageId = (params as { passageId: string }).passageId;
  const passage = await getPassage(passageId);
  if (!passage) return notFound();
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{passage.title}</h1>
      <div className="mb-2 text-gray-500">{passage.description}</div>
      {passage.imageUrl && (
        <img
          src={passage.imageUrl}
          alt="Passage"
          className="mb-4 rounded-xl max-h-60"
        />
      )}
      {passage.videoUrl && (
        <video
          src={passage.videoUrl}
          controls
          className="mb-4 rounded-xl max-h-60 w-full"
        />
      )}
      <div
        className="prose mb-4"
        dangerouslySetInnerHTML={{ __html: passage.content || "" }}
      />
      <div className="text-xs text-gray-400 mt-6">
        Type: {passage.type}
      </div>
    </div>
  );
}
