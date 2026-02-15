import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  fullWidth?: boolean;
}

export const Section: React.FC<SectionProps> = ({ children, className = '', id, fullWidth = false }) => {
  return (
    <section id={id} className={`py-20 md:py-32 ${className}`}>
      {fullWidth ? (
        children
      ) : (
        <div className="max-w-7xl mx-auto px-6">
          {children}
        </div>
      )}
    </section>
  );
};

export const SectionTitle: React.FC<{ 
  eyebrow?: string; 
  title: string; 
  description?: string;
  center?: boolean;
}> = ({ eyebrow, title, description, center = false }) => (
  <div className={`mb-16 max-w-3xl ${center ? 'mx-auto text-center' : ''} animate-fade-in`}>
    {eyebrow && (
      <span className="block text-neuro-gold text-xs uppercase tracking-[0.2em] mb-4">
        {eyebrow}
      </span>
    )}
    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 text-neuro-black leading-tight">
      {title}
    </h2>
    {description && (
      <p className="font-sans text-lg text-gray-600 font-light leading-relaxed">
        {description}
      </p>
    )}
  </div>
);