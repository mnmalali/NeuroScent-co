import React from 'react';
import { Section, SectionTitle } from '../components/Section';

export const Future: React.FC = () => {
  return (
    <>
      <Section className="pt-32">
        <SectionTitle 
          eyebrow="Roadmap" 
          title="Beyond the Bottle" 
          description="NeuroScent is currently in Phase 1. Our vision extends far beyond simple personalization."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20">
           <div className="space-y-6">
             <h3 className="font-serif text-2xl border-b border-neuro-gold pb-4 inline-block">Skin pH Integration</h3>
             <p className="font-light text-gray-600 leading-relaxed">
               Future iterations of our hardware will include biosensors to measure your skin's pH and oil levels. 
               The AI will then adjust the formula to compensate for how your skin chemistry alters fragrances.
             </p>
           </div>
           
           <div className="space-y-6">
             <h3 className="font-serif text-2xl border-b border-neuro-gold pb-4 inline-block">Memory Scents</h3>
             <p className="font-light text-gray-600 leading-relaxed">
               We are exploring NLP (Natural Language Processing) to analyze your journal entries or descriptions 
               of a past memory, attempting to recreate the "scent" of that moment using our accord library.
             </p>
           </div>

           <div className="space-y-6">
             <h3 className="font-serif text-2xl border-b border-neuro-gold pb-4 inline-block">Celebrity Archetypes</h3>
             <p className="font-light text-gray-600 leading-relaxed">
               Collaborations with public figures to release their "Scent Archetype" data. You could then blend 
               your profile with theirs—wearing a scent that is 50% you and 50% your idol.
             </p>
           </div>
        </div>
      </Section>
    </>
  );
};