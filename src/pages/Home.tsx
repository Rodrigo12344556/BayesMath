import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NavBar } from '@/components/NavBar';
import { HeroSection } from '@/components/sections/HeroSection';
import { OlimpiadaSection } from '@/components/sections/OlimpiadaSection';
import { HomeSpecialtiesPreview } from '@/components/sections/HomeSpecialtiesPreview';
import { HomeCoursesPreview } from '@/components/sections/HomeCoursesPreview';
import { WhyBayesMath } from '@/components/sections/WhyBayesMath';
import { AlliancesSection } from '@/components/sections/AlliancesSection';
import { CoursesSection } from '@/components/sections/CoursesSection';
import { SpecialtiesSection } from '@/components/sections/SpecialtiesSection';
import { DocentesSection } from '@/components/sections/DocentesSection';
import { CommunitySection } from '@/components/sections/CommunitySection';
import { SocialSection } from '@/components/sections/SocialSection';
import { Footer } from '@/components/sections/Footer';
import { Chatbot } from '@/components/Chatbot';

type SectionId = 'hero' | 'cursos' | 'especialidades' | 'docentes' | 'comunidad' | 'redes';

const pageVariants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: 'easeIn' } },
};

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>('hero');

  const handleNavigate = (id: string) => {
    setActiveSection(id as SectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-white">
      <NavBar activeSection={activeSection} onNavigate={handleNavigate} />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {activeSection === 'hero' && (
            <>
              <HeroSection onNavigate={handleNavigate} />
              <OlimpiadaSection />
              <HomeSpecialtiesPreview onNavigate={handleNavigate} />
              <HomeCoursesPreview />
              <WhyBayesMath />
              <AlliancesSection />
              <Footer />
            </>
          )}
          {activeSection === 'cursos' && <><CoursesSection /><Footer /></>}
          {activeSection === 'especialidades' && <><SpecialtiesSection /><Footer /></>}
          {activeSection === 'docentes' && <><DocentesSection /><Footer /></>}
          {activeSection === 'comunidad' && <><CommunitySection /><Footer /></>}
          {activeSection === 'redes' && <><SocialSection /><Footer /></>}
        </motion.div>
      </AnimatePresence>
      <Chatbot />
    </div>
  );
}
