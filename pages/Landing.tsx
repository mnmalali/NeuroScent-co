import React from 'react';
import { Section, SectionTitle } from '../components/Section';
import { Button } from '../components/Button';

export const Landing: React.FC = () => {
  return (
    <>
      {/* Hero */}
      <div className="relative h-screen min-h-[600px] flex items-center bg-neuro-ivory overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=1234&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D=crop')] bg-cover bg-center" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
          <div className="max-w-4xl animate-fade-in">
            <span className="block text-neuro-gold text-xs uppercase tracking-[0.3em] mb-6">
              The Future of Fragrance
            </span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-8 text-neuro-black">
              Scent, synthesized <br/> by your subconscious.
            </h1>
            <p className="font-sans text-lg md:text-xl font-light text-gray-700 mb-12 max-w-2xl leading-relaxed">
              NeuroScent combines artificial intelligence, academic research, and precision robotics 
              to translate your personality into a bespoke olfactory signature.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button to="/products" icon>Start Your Scent</Button>
              <Button to="/how-it-works" variant="outline">How It Works</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Concept Snapshot */}
      <Section className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1602928309809-776bf9db8658?q=80&w=698&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D=crop" 
              alt="Lab glassware" 
              className="w-full h-[600px] object-cover grayscale opacity-90 hover:opacity-100 transition-opacity duration-700"
            />
          </div>
          <div className="space-y-8">
            <SectionTitle 
              eyebrow="The Philosophy" 
              title="One-to-one personalization, never mass-market."
            />
            <p className="text-gray-600 font-light leading-relaxed">
              True luxury is not about wearing what everyone else wears. It is about discovering what is uniquely yours. 
              We reject the industrial standard of "one scent fits all" in favor of a fluid, data-driven approach 
              to perfumery.
            </p>
            <p className="text-gray-600 font-light leading-relaxed">
              Our system integrates three subsystems: an AI personalization engine, an automated dispensing machine, 
              and a curated library of scientific accords.
            </p>
            <Button to="/science" variant="outline" className="mt-4">The Science Behind Scent</Button>
          </div>
        </div>
      </Section>

      {/* Scent Profiles Preview */}
      <Section className="bg-neuro-ivory">
        <SectionTitle 
          center 
          eyebrow="Curated Accords" 
          title="Designed for emotion." 
          description="Our fixed system of curated accords serves as the alphabet for your unique formula. Each represents a functional role and emotional profile."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Fresh Lift",
              desc: "Awakening, crisp, and intellectual.",
              img: "https://images.unsplash.com/photo-1562957396-8c499fb64de5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D=crop"
            },
            {
              title: "Soft Floral Air",
              desc: "Ethereal, calming, and weightless.",
              img: "https://images.unsplash.com/photo-1724233957621-ca75272383b7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D=crop"
            },
            {
              title: "Clean Skin Musk",
              desc: "Intimate, sensual, and grounding.",
              img: "https://images.unsplash.com/photo-1572635148687-307f8ca9b737?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D=crop"
            }
          ].map((item, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="overflow-hidden mb-6 aspect-[3/4]">
                <img 
                  src={item.img} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="font-serif text-2xl mb-2">{item.title}</h3>
              <p className="text-sm font-light text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <Button to="/scent-profiles" variant="secondary">Explore All Accords</Button>
        </div>
      </Section>

      {/* Call to Action */}
      <Section className="bg-neuro-black text-neuro-ivory text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="font-serif text-5xl md:text-6xl mb-6">Begin your analysis.</h2>
          <p className="text-gray-400 font-light text-lg mb-8">
            Allow our AI to deconstruct your preferences and assemble your signature fragrance.
          </p>
          <Button to="/products" className="bg-neuro-ivory text-neuro-black hover:bg-neuro-gold hover:text-white">
            Create Your Perfume
          </Button>
        </div>
      </Section>
    </>
  );
};