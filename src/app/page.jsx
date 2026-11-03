'use client';

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import Hero from '@/components/hero/Hero';
import AboutSection from '@/components/about/AboutSection';
import ProjectsSection from '@/components/projects/ProjectsSection';
import SkillsSection from '@/components/skills/SkillsSection';
import JourneySection from '@/components/journey/JourneySection';
import ContactSection from '@/components/contact/ContactSection';
import { useScrollJourney } from '@/lib/scroll-journey';

import ContinuousScrollRail from '@/components/visual/ContinuousScrollRail';

// Dynamically load the persistent generative canvas with ssr: false for optimal client performance
const GenerativeJourneyCanvas = dynamic(
  () => import('@/components/visual/GenerativeJourneyCanvas'),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function Home() {
  const containerRef = useRef(null);

  // Initialize GSAP ScrollTrigger scrubbed timeline tracking
  useScrollJourney(containerRef);

  return (
    <div ref={containerRef} id="journey-container" className="relative w-full">
      {/* 
        Persistent Full-Viewport Generative Environment
        Continuously evolves across the 6 narrative stages without any 3D rotation
      */}
      <GenerativeJourneyCanvas />

      {/* 
        Continuous Scroll Journey Rail
        Direct physical and visual telemetry link connecting Hero through Contact
      */}
      <ContinuousScrollRail />

      {/* 
        Foreground Editorial HTML Content
        Structured across the 6 narrative chapters:
        Ch 1: Hero — Enter the Intelligence Field
        Ch 2: About — Information Becomes Structure
        Ch 3: CareerLens — Orchestration & Reasoning
        Ch 4: AgriInsight — Data & Prediction
        Ch 5: YT GPT — Semantic Retrieval & Context
        Ch 6: Synthesis & Connection (Expertise, Journey, Contact)
      */}
      <div className="relative z-10 space-y-16 sm:space-y-24">
        <Hero />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <JourneySection />
        <ContactSection />
      </div>
    </div>
  );
}
