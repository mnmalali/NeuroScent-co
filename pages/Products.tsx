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

          {/* Secondary products removed per request */}
      </Section>
    </>
  );
};