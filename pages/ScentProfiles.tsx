import React from 'react';
import { Section, SectionTitle } from '../components/Section';

const ACCORDS = [
  {
    id: "01",
    name: "Fresh Lift",
    tagline: "Brightness, cleanliness, first impression",
    desc: "Blends cleanly with woods and ambers. No aggressive top notes. Strong freshness without sporty or detergent character.",
    emotional: "Bright citrus opening → airy freshness → clean, modern drydown",
    notes: "Bergamot oil FCF, Dihydromyrcenol, Hedione",
    color: "bg-blue-50"
  },
  {
    id: "02",
    name: "Soft Floral Air",
    tagline: "Lightness, openness, elegance",
    desc: "Adds elegance without dominance. Keeps blends breathable and modern. Enhances both fresh and warm accords.",
    emotional: "Transparent florals → airy petals → soft clean finish",
    notes: "Hedione, Phenyl Ethyl Alcohol, Linalool",
    color: "bg-pink-50"
  },
  {
    id: "03",
    name: "Clean Skin Musk",
    tagline: "Comfort, safety, familiarity",
    desc: "Universally likable. Makes any blend more wearable. Acts as emotional glue.",
    emotional: "Clean skin → soft warmth → subtle musky trail",
    notes: "Galaxolide, Habanolide, Iso E Super",
    color: "bg-stone-100"
  },
  {
    id: "04",
    name: "Woody Skin",
    tagline: "Body, calm, modern skin-wood backbone",
    desc: "Extremely difficult to overdose harshly. Bridges fresh to warm seamlessly. Structural spine of the system.",
    emotional: "Soft woods → warm skin → slightly creamy, ultra-modern",
    notes: "Iso E Super, Ambroxan, Hedione",
    color: "bg-stone-200"
  },
  {
    id: "05",
    name: "Warm Amber Depth",
    tagline: "Sensuality, intimacy, memorability",
    desc: "Sensual but not gourmand. Deep but not heavy. Adds longevity and emotional weight.",
    emotional: "Dry amber warmth → subtle sweetness → mineral skin glow",
    notes: "Ambroxan, Iso E Super, Vanillin",
    color: "bg-orange-50"
  },
  {
    id: "06",
    name: "Soft Sweet Comfort",
    tagline: "Pleasure, coziness, emotional warmth",
    desc: "Enhances emotional appeal. Softens dry or sharp blends. Keeps sweetness controlled and modern.",
    emotional: "Gentle sweetness → creamy warmth → soft comforting trail",
    notes: "Vanillin, Ethyl Maltol, Benzoin",
    color: "bg-yellow-50"
  },
  {
    id: "07",
    name: "Sparkle Spice Accent",
    tagline: "Energy, intrigue, personality accent",
    desc: "Adds interest without dominance. Works in fresh, woody, and warm blends. Prevents compositions from feeling flat.",
    emotional: "Fresh spice → light warmth → clean sparkling finish",
    notes: "Pink Pepper CO2, Cardamom, Bergamot",
    color: "bg-red-50"
  },
  {
    id: "08",
    name: "Green Balance",
    tagline: "Balance, clarity, natural freshness",
    desc: "Balances sweet and warm accords. Adds natural freshness without sharpness. Keeps blends grounded and elegant.",
    emotional: "Soft green freshness → airy woods → clean earthiness",
    notes: "Stemone, Linalool, Iso E Super",
    color: "bg-emerald-50"
  }
];

export const ScentProfiles: React.FC = () => {
  return (
    <>
      <Section className="bg-neuro-ivory pt-32">
        <SectionTitle 
          eyebrow="The Architecture" 
          title="Building Blocks of Emotion" 
          description="Our machine does not mix random notes. It composes with master accords—complex pre-blended structures designed to interact harmoniously in any ratio."
        />
      </Section>

      <div className="flex flex-col">
        {ACCORDS.map((accord, idx) => (
          <div key={accord.id} className={`sticky top-0 min-h-screen flex items-center justify-center py-20 px-6 ${accord.color}`}>
             <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="order-2 md:order-1 space-y-8 animate-fade-in">
                  <div className="flex items-center space-x-4">
                     <span className="font-serif text-6xl text-neuro-gold opacity-50">{accord.id}</span>
                     <div className="h-px bg-neuro-black w-20"></div>
                  </div>
                  <h2 className="font-serif text-5xl md:text-6xl text-neuro-black">{accord.name}</h2>
                  <p className="text-sm font-bold uppercase tracking-widest text-gray-500">{accord.tagline}</p>
                  
                  <div className="space-y-6 pt-8">
                    <div>
                      <h4 className="font-serif text-xl mb-2">Why It Works</h4>
                      <p className="font-light text-gray-700 leading-relaxed">{accord.desc}</p>
                    </div>
                    <div>
                      <h4 className="font-serif text-xl mb-2">Smell Profile</h4>
                      <p className="font-light text-gray-700 italic">{accord.emotional}</p>
                    </div>
                    <div>
                      <h4 className="font-serif text-xl mb-2">Composition Start</h4>
                      <p className="font-mono text-xs text-gray-500">{accord.notes}</p>
                    </div>
                  </div>
                </div>
                
                <div className="order-1 md:order-2 h-[500px] relative overflow-hidden rounded-sm bg-white shadow-xl">
                   {/* Abstract visualization of scent */}
                   <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent z-10"></div>
                   <img 
                      src={`https://source.unsplash.com/random/800x1000?abstract,texture,minimal&sig=${parseInt(accord.id)}`}
                      alt={`${accord.name} Visualization`}
                      className="w-full h-full object-cover opacity-90"
                   />
                </div>
             </div>
          </div>
        ))}
      </div>
    </>
  );
};