export interface NavItem {
  label: string;
  path: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  university: string;
  image: string;
}

export interface Accord {
  id: string;
  name: string;
  description: string;
  emotionalProfile: string;
  role: string;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
}