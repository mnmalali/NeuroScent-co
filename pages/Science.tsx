import React from 'react';
import { Section, SectionTitle } from '../components/Section';

export const Science: React.FC = () => {
  return (
    <>
      <Section className="pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <SectionTitle 
              eyebrow="Research Foundations" 
              title="Quantifying the Intangible" 
            />
            <div className="space-y-6 text-gray-600 font-light leading-relaxed text-lg">
              <p>
                Scent is the most primal sense, directly linked to the limbic system—the brain's emotional center. 
                Traditional perfumery relies on the subjective intuition of a "Nose". At NeuroScent, we augment this 
                intuition with data science.
              </p>
              <p>
                Our research focuses on <strong>Olfactory Mapping</strong>: the process of correlating specific 
                chemical structures (molecules) with consistent human emotional responses.
              </p>
            </div>
          </div>
          <div className="bg-neuro-black p-12 text-neuro-ivory flex flex-col justify-center">
            <h3 className="font-serif text-3xl mb-6">The Algorithm</h3>
            <p className="font-mono text-sm leading-loose text-gray-400">
              Input: UserVectors (Personality, Mood, Memory) <br/>
              Process: <br/>
              &nbsp;&nbsp;1. Map vectors to EmotionalTarget <br/>
              &nbsp;&nbsp;2. Calculate AccordRatios to match Target <br/>
              &nbsp;&nbsp;3. Verify HarmonicConstraint <br/>
              Output: Formula_ID_Hex
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-neuro-ivory">
        <SectionTitle 
          center 
          eyebrow="Accord Architecture" 
          title="Modular Design"
          description="We do not mix raw chemicals directly. We use 'Accords'—pre-balanced harmonic structures."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
           <div className="p-8 border border-neuro-gold/20 bg-white">
             <div className="w-16 h-16 bg-neuro-stone rounded-full mx-auto mb-6 flex items-center justify-center font-serif text-xl">T</div>
             <h4 className="font-serif text-xl mb-4">Top Notes</h4>
             <p className="text-sm font-light text-gray-500">The Introduction. High volatility, immediate impact. Determines the "Fresh" or "Bright" character.</p>
           </div>
           <div className="p-8 border border-neuro-gold/20 bg-white">
             <div className="w-16 h-16 bg-neuro-stone rounded-full mx-auto mb-6 flex items-center justify-center font-serif text-xl">M</div>
             <h4 className="font-serif text-xl mb-4">Mid Notes</h4>
             <p className="text-sm font-light text-gray-500">The Heart. Moderate volatility. Bridges the gap and defines the floral, spicy, or herbal family.</p>
           </div>
           <div className="p-8 border border-neuro-gold/20 bg-white">
             <div className="w-16 h-16 bg-neuro-stone rounded-full mx-auto mb-6 flex items-center justify-center font-serif text-xl">B</div>
             <h4 className="font-serif text-xl mb-4">Base Notes</h4>
             <p className="text-sm font-light text-gray-500">The Memory. Low volatility, long-lasting. Provides depth, warmth, and the "dry down" signature.</p>
           </div>
        </div>
      </Section>
    </>
  );
};