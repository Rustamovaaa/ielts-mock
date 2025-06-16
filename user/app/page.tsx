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
            <Plyr
              source={{
                type: 'video',
                sources: [
                  {
                    src: "https://www.youtube.com/watch?v=https://www.youtube.com/watch?v=uIByr0xpWvc&list=RDuIByr0xpWvc&start_radio=1",
                    provider: 'youtube'
                  }
                ]
              }}
            // style={{ borderRadius: '12px', overflow: 'hidden' }} 
            />
        </div>
          <Footer />
      </div>
  );
}
