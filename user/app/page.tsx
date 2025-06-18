"use client";
import Hero from "@/components/layout/hero-section";
import Footer from "@/components/layout/footer";
import dynamic from "next/dynamic";

import "plyr-react/plyr.css";

import React from "react";

const Plyr = dynamic(() => import("plyr-react"), { ssr: false });

export default function Home() {
  return (
      <div>
          <Hero />
          <div className="mb-4">
        </div>
          <Footer />
      </div>
  );
}
