import React from 'react';
import { Section, SectionTitle } from '../components/Section';
import { ExternalLink } from 'lucide-react';

const TEAM = [
  {
    name: "Abdulwahhab Ali",
    major: "Computer Science",
    img: "https://ui-avatars.com/api/?name=Abdulwahhab+Ali&background=1A1A1A&color=D4AB5C&size=200&font-size=0.33",
    linkedin: "https://www.linkedin.com/in/abdulwahhabali"
  },
  {
    name: "Mazin Mohamedahmed Salim",
    major: "Computer Science",
    img: "https://ui-avatars.com/api/?name=Mazin+Salim&background=1A1A1A&color=D4AB5C&size=200&font-size=0.33",
    linkedin: null
  },
  {
    name: "Mohammed Alali",
    major: "Computer Science",
    img: "https://ui-avatars.com/api/?name=Mohammed+Alali&background=1A1A1A&color=D4AB5C&size=200&font-size=0.33",
    linkedin: "https://www.linkedin.com/in/mohammednumanalali"
  },
  {
    name: "Omar Mwafy",
    major: "Computer Engineering",
    img: "https://ui-avatars.com/api/?name=Omar+Mwafy&background=1A1A1A&color=D4AB5C&size=200&font-size=0.33",
    linkedin: "https://www.linkedin.com/in/omar-mwafy-1224012a7/"
  },
  {
    name: "Yazan Mohammed",
    major: "Computer Science",
    img: "https://ui-avatars.com/api/?name=Yazan+Mohammed&background=1A1A1A&color=D4AB5C&size=200&font-size=0.33",
    linkedin: "https://www.linkedin.com/in/yazan-mohammed-7a8560336"
  }
];

export const About: React.FC = () => {
  return (
    <>
      <Section className="bg-neuro-black text-neuro-ivory pt-40 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-neuro-gold text-xs uppercase tracking-[0.2em] mb-8 block">Our Mission</span>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-12">
            To decode the intangible language of scent and reconstruct it with the precision of code.
          </h1>
          <p className="font-light text-xl text-gray-400 leading-relaxed">
            NeuroScent is not just a perfume brand. It is a research initiative exploring the 
            frontier between human sensory experience and machine learning.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
           <div>
             <SectionTitle 
               eyebrow="The Origin" 
               title="A Multidisciplinary Intersection"
             />
             <div className="space-y-6 text-gray-600 font-light leading-relaxed">
               <p>
                 Born from a university research cluster, NeuroScent began with a simple question: 
                 Why is the perfume industry still relying on mass manufacturing when technology allows for infinite customization?
               </p>
               <p>
                 Our team merges distinct disciplines—chemical engineering, computer science, and luxury design—to 
                 build a system that respects the art of perfumery while upgrading its delivery mechanism.
               </p>
               <p>
                 We are particularly focused on the UAE market, where fragrance is deeply embedded in culture and 
                 personal identity is paramount.
               </p>
             </div>
           </div>
           <div className="h-[500px] bg-gray-100 relative">
             <img 
               src="https://images.unsplash.com/photo-1710026562268-0bcd9cdaef01?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D=crop" 
               alt="Team working in lab" 
               className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
             />
           </div>
        </div>
      </Section>

      <Section className="bg-neuro-ivory">
        <SectionTitle 
          center 
          eyebrow="The Minds" 
          title="The Team" 
          description="We are engineers, designers, and dreamers working to rewrite the future of fragrance."
        />
        <div className="flex flex-wrap justify-center gap-10">
          {TEAM.map((member, idx) => (
            <div key={idx} className="group text-center w-full sm:w-[calc(50%-2.5rem)] md:w-[calc(33.33%-2.5rem)] lg:w-[calc(20%-2.5rem)] flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-6 relative border-2 border-neuro-gold/20 group-hover:border-neuro-gold transition-colors duration-500 shadow-md">
                 <img 
                   src={member.img} 
                   alt={member.name}
                   className="w-full h-full object-cover"
                 />
              </div>
              <h3 className="font-serif text-lg mb-1 h-14 flex items-center justify-center leading-tight">{member.name}</h3>
              <p className="text-neuro-gold text-xs uppercase tracking-widest mb-4 h-8">{member.major}</p>
              
              {member.linkedin ? (
                <a 
                  href={member.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-2 text-xs font-medium text-neuro-black bg-white border border-neuro-black/20 hover:border-neuro-gold hover:text-neuro-gold px-4 py-2 rounded-full transition-all duration-300"
                >
                  Learn More <ExternalLink size={12} />
                </a>
              ) : (
                <div className="mt-auto h-[34px]"></div> // Spacer to align buttons if one is missing
              )}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
};