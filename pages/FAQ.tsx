import React, { useState } from 'react';
import { Section, SectionTitle } from '../components/Section';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQItem } from '../types';

const FAQS: FAQItem[] = [
  {
    question: "Is this a real product I can buy?",
    answer: "NeuroScent is currently a research prototype and luxury concept. We are in the pre-seed phase and conducting private demonstrations for evaluators and investors."
  },
  {
    question: "How long does the process take?",
    answer: "The AI analysis takes approximately 2-3 minutes. The physical dispensing of the perfume takes about 90 seconds."
  },
  {
    question: "Can I refill my bottle?",
    answer: "Yes. Your unique Formula ID is saved in our database. You can reorder your exact signature scent, or choose to tweak it if your preferences have changed."
  },
  {
    question: "Are the ingredients natural?",
    answer: "We use a hybrid approach. Our accords contain high-quality natural absolutes for depth, combined with safe synthetic molecules for structure, longevity, and sustainability."
  },
  {
    question: "What if I don't like my scent?",
    answer: "Our AI is designed to learn. If the result isn't perfect, you can provide feedback, and the system will suggest an iteration—adjusted to be fresher, warmer, or softer."
  }
];

export const FAQ: React.FC = () => {
  return (
    <Section className="pt-32 min-h-[80vh]">
      <SectionTitle 
        center 
        eyebrow="Support" 
        title="Frequently Asked Questions" 
      />
      <div className="max-w-2xl mx-auto space-y-4">
        {FAQS.map((faq, idx) => (
          <FAQAccordion key={idx} item={faq} />
        ))}
      </div>
    </Section>
  );
};

const FAQAccordion: React.FC<{ item: FAQItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button 
        className="w-full flex justify-between items-center py-6 text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-serif text-lg">{item.question}</span>
        {isOpen ? <ChevronUp className="text-neuro-gold" /> : <ChevronDown className="text-gray-400" />}
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-40 opacity-100 pb-6' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-gray-600 font-light leading-relaxed">{item.answer}</p>
      </div>
    </div>
  );
};