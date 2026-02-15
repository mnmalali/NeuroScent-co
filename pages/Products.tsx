import React from 'react';
import { Section, SectionTitle } from '../components/Section';
import { Button } from '../components/Button';
import { SplineShowcase } from '../components/SplineShowcase';

export const Products: React.FC = () => {
  return (
    <>
      <Section className="pt-32">
        <SectionTitle 
          eyebrow="The Collection" 
          title="Design your olfactory signature." 
          description="From initial discovery to daily ritual, explore how NeuroScent brings your personalized formula to life."
        />

        {/* Main Product */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32 items-center">
          <div className="order-2 lg:order-1 space-y-8">
            <h3 className="font-serif text-4xl">The Personalized Essence</h3>
            <div className="flex items-baseline space-x-4">
              <span className="text-xl font-light text-neuro-gold">$180.00</span>
              <span className="text-sm text-gray-400 uppercase tracking-wide">50ml Eau de Parfum</span>
            </div>
            <p className="text-gray-600 font-light leading-relaxed">
              A bespoke formulation created exclusively for you. Based on our AI analysis of your personality and preferences, 
              the machine will dispense a unique ratio of our master accords. No two formulas are exactly alike.
            </p>
            <ul className="space-y-4 pt-4 border-t border-gray-200">
              <li className="flex items-center text-sm font-light text-gray-600">
                <span className="w-1.5 h-1.5 bg-neuro-gold rounded-full mr-3"></span>
                AI Personality Analysis
              </li>
              <li className="flex items-center text-sm font-light text-gray-600">
                <span className="w-1.5 h-1.5 bg-neuro-gold rounded-full mr-3"></span>
                Live Dispensing & Mixing
              </li>
              <li className="flex items-center text-sm font-light text-gray-600">
                <span className="w-1.5 h-1.5 bg-neuro-gold rounded-full mr-3"></span>
                Custom Labeling with Your Name & Formula ID
              </li>
            </ul>
            <div className="pt-8">
              <Button>Start Analysis</Button>
            </div>
          </div>
          <div className="order-1 lg:order-2 bg-neuro-stone h-[600px] relative overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=2504&auto=format&fit=crop" 
              alt="Perfume Bottle"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          </div>
        </div>

        {/* 3D Showcase Section */}
        <div className="mb-32">
          <SplineShowcase />
        </div>

        {/* Secondary Products */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
           <div className="group">
            <div className="bg-gray-100 aspect-square mb-6 overflow-hidden">
               <img 
                 src="https://images.unsplash.com/photo-1617066804618-2e2324dc0539?q=80&w=2574&auto=format&fit=crop" 
                 alt="Discovery Set"
                 className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
               />
            </div>
            <h4 className="font-serif text-xl mb-2">Discovery Set</h4>
            <p className="text-sm text-gray-500 mb-4 font-light">Experience the raw accords before your analysis.</p>
            <span className="block text-neuro-gold mb-4">$45.00</span>
            <Button variant="outline" className="w-full">View Details</Button>
           </div>

           <div className="group">
            <div className="bg-gray-100 aspect-square mb-6 overflow-hidden">
               <img 
                 src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=2574&auto=format&fit=crop" 
                 alt="Refill"
                 className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
               />
            </div>
            <h4 className="font-serif text-xl mb-2">Formula Refill</h4>
            <p className="text-sm text-gray-500 mb-4 font-light">Reorder your unique Formula ID.</p>
            <span className="block text-neuro-gold mb-4">$140.00</span>
            <Button variant="outline" className="w-full">Reorder</Button>
           </div>

           <div className="group">
            <div className="bg-gray-100 aspect-square mb-6 overflow-hidden flex items-center justify-center bg-neuro-black text-white p-8">
               <div className="text-center">
                 <h4 className="font-serif text-2xl mb-4">Future Vision</h4>
                 <p className="font-light text-sm text-gray-400">Skin pH Integration & <br/>Celebrity Archetypes</p>
               </div>
            </div>
            <h4 className="font-serif text-xl mb-2">Experimental Series</h4>
            <p className="text-sm text-gray-500 mb-4 font-light">Join the waitlist for beta features.</p>
            <Button variant="outline" className="w-full" to="/future">Learn More</Button>
           </div>
        </div>
      </Section>
    </>
  );
};