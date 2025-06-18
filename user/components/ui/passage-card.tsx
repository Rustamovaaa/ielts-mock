import React from "react";
import Link from "next/link";


const PassageCard = (passage: Passage & { linkPrefix?: string }) => {
  const { _id, title, content, linkPrefix = "/reading" } = passage;
  return (
    <Link href={`${linkPrefix}/${_id}`} className="block group">
      <div className="relative bg-gradient-to-br from-blue-50 via-white to-purple-100 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 flex flex-col gap-2 border border-gray-200 overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute -top-8 -left-8 w-32 h-32 bg-purple-200 opacity-30 rounded-full blur-2xl z-0 group-hover:scale-110 transition-transform duration-300" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-100 opacity-20 rounded-full blur-2xl z-0 group-hover:scale-105 transition-transform duration-300" />
        <div className="relative z-10">
          <h2 className="text-xl font-bold text-gray-800 mb-2 truncate" title={title}>{title}</h2>
          <p className="text-gray-700 line-clamp-4 text-sm">{content}</p>
        </div>
      </div>
    </Link>
  );
};

export default PassageCard;
