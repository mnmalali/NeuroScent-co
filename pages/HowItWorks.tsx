import React from 'react';
import { Section, SectionTitle } from '../components/Section';
import { ArrowRight } from 'lucide-react';

const STEPS = [
  {
    num: "01",
    title: "The Dialogue",
    desc: "You engage with our digital interface. Through a series of psychographic and sensory questions, the AI maps your preferences, memories, and personality traits."
  },
  {
    num: "02",
    title: "The Translation",
    desc: "Your data is processed by our proprietary algorithm, which translates abstract inputs (e.g., 'I want to feel calm') into concrete chemical ratios (e.g., increase Soft Floral Air by 15%)."
  },
  {
    num: "03",
    title: "The Formula",
    desc: "A unique Formula ID is generated. This code represents your exact scent profile and is sent wirelessly to the NeuroScent Dispenser."
  },
  {
    num: "04",
    title: "The Synthesis",
    desc: "The machine activates. High-precision peristaltic pumps draw from our master accords, mixing them in real-time directly into your bottle."
  },
  {
    num: "05",
    title: "The Experience",
    desc: "Your personalized perfume is sealed, labeled with your name and Formula ID, and ready for use. You can reorder this exact scent anytime."
  }
];

export const HowItWorks: React.FC = () => {
  return (
    <>
      <Section className="pt-32 bg-neuro-stone/30">
        <SectionTitle 
          center
          eyebrow="The Process" 
          title="From Data to Droplet" 
          description="A seamless journey from your subconscious mind to a physical artifact."
        />
      </Section>

      <Section>
        <div className="relative border-l border-neuro-gold/30 ml-4 md:ml-1/2 space-y-20">
          {STEPS.map((step, idx) => (
            <div key={idx} className="relative pl-12 md:pl-0">
               {/* Timeline Dot */}
               <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 bg-neuro-gold rounded-full z-10"></div>
               
               <div className={`md:flex items-start gap-16 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                 <div className="md:w-1/2 mb-6 md:mb-0">
                    <div className="bg-white p-8 md:p-12 shadow-sm border border-gray-100 hover:border-neuro-gold/50 transition-colors duration-300">
                      <span className="block text-neuro-gold text-4xl font-serif mb-4">{step.num}</span>
                      <h3 className="font-serif text-2xl mb-4">{step.title}</h3>
                      <p className="font-light text-gray-600 leading-relaxed">{step.desc}</p>
                    </div>
                 </div>
                 <div className="md:w-1/2 flex items-center justify-center md:justify-start md:pl-16">
                    {/* Placeholder for step illustration */}
                    <div className="hidden md:block w-full h-px bg-gray-200"></div>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
};