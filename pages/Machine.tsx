import React from 'react';
import { Section, SectionTitle } from '../components/Section';

export const Machine: React.FC = () => {
  return (
    <>
      <Section className="pt-32">
        <SectionTitle 
          center
          eyebrow="The Hardware" 
          title="Automated Precision" 
          description="The NeuroScent Dispenser is a custom-engineered liquid handling robot designed for the viscosity and volatility of fine fragrance."
        />
      </Section>

      <Section fullWidth className="bg-neuro-black text-neuro-ivory py-32">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 relative">
            {/* Technical Diagram Placeholder */}
            <div className="border border-gray-700 p-8 rounded-sm relative">
               <div className="absolute top-0 left-0 p-2 bg-neuro-gold text-neuro-black text-xs font-bold uppercase">Schematic View</div>
               <div className="space-y-8 font-mono text-sm text-gray-400 mt-8">
                 <div className="flex justify-between border-b border-gray-800 pb-2">
                   <span>Actuator Type</span>
                   <span>High-Torque Stepper Motor</span>
                 </div>
                 <div className="flex justify-between border-b border-gray-800 pb-2">
                   <span>Dispensing Method</span>
                   <span>Peristaltic Pump (Medical Grade)</span>
                 </div>
                 <div className="flex justify-between border-b border-gray-800 pb-2">
                   <span>Accuracy</span>
                   <span>+/- 0.05ml</span>
                 </div>
                 <div className="flex justify-between border-b border-gray-800 pb-2">
                   <span>Material</span>
                   <span>Anodized Aluminum / Borosilicate Glass</span>
                 </div>
               </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 space-y-8">
             <h3 className="font-serif text-4xl">Dispensing Logic</h3>
             <p className="font-light text-gray-400 leading-relaxed">
               The machine holds 6 canisters of master accords. Upon receiving a Formula ID, the microcontroller 
               calculates the exact number of steps required for each pump to dispense the correct ratio.
             </p>
             <p className="font-light text-gray-400 leading-relaxed">
               To prevent cross-contamination, the system uses dedicated silicone tubing for each scent channel, 
               ensuring that mixing only occurs inside the final user's bottle.
             </p>
          </div>
        </div>
      </Section>
    </>
  );
};