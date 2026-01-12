
// Types for the Afton Industries Engineering Logbook

export enum ProjectCategory {
  MECHATRONICS = 'Mechatronics & Robotics',
  SOFTWARE = 'Software & AI Systems',
  ELECTRONICS = 'Embedded Systems'
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  specs: string[];
  imageUrl: string;
  videoUrl?: string; // Optional video showcase
  galleryImages?: string[]; // Multiple images for gallery view
  currentPhase: 'Design' | 'Assembly' | 'Firmware Debugging' | 'UI/UX Dev';
  phaseDetails: string[];
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isAudio?: boolean;
}

export interface Innovation {
  id: string;
  title: string;
  tag: string;
  description: string;
  blueprintUrl: string;
}

/**
 * TechItem interface for describing engineering stack components
 */
export interface TechItem {
  id: string;
  category: string;
  name: string;
  details: string;
  imageUrl: string;
  size?: 'normal' | 'large';
}