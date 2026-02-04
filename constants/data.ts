
import { Project, Experience, BlogPost } from '../types';
import { getAllBlogPosts } from '../services/blogService';

export const BIO = "Hi I'm [PROFILE_PIC] Tyler Palmer,\n\nI'm a jock turned product builder. I love crafting interfaces and coding solutions with unlimited possibilities. I am currently building [SCHEEME_ICON]Scheeme, so follow as a build in public on [X_ICON]. When I am not building, I am running 🏃, playing golf 🏌️, or rooting on my favorite sports teams [MIAMI_LOGO][MIAMI_HEAT_LOGO][MIAMI_DOLPHINS_LOGO][FLORIDA_PANTHERS_LOGO][FLORIDA_MARLINS_LOGO].";

export const EXPERIENCES: Experience[] = [
  {
    company: 'Snap! Mobile',
    role: 'Senior Product Manager',
    period: '2019 — 2026',
    description: 'E-Commerce, Payments, Fulfillment, Sponsorship/Ads, SAAS',
    achievements: ['Scaled Commerce revenue by 5x north of $20M', '0→1 Building', 'Payments', '3rd Party API Integrations']
  },
  {
    company: 'The Grind House',
    role: 'Co-Owner',
    period: '2018 — 2021',
    description: 'Startup Sports Training Facility',
    achievements: ['Scaled to $1M ARR in 14 months']
  },
  {
    company: 'Blast Motion',
    role: 'Southeast Sales Manager',
    period: 'Summer 2018',
    description: 'Sales Manager work Sports Tech Wearable in Baseball/Softball/Golf',
    achievements: ['Secured multiple 6 figure contracts earning net new business']
  },
  {
    company: 'Snap! Raise',
    role: 'Sales Rep/Regional Sales Manager',
    period: '2016 — 2018',
    description: 'Started as Sales Rep in FL territory then promoted to Regional Sales Manager leading team of 25+ sales reps',
    achievements: ['Built FL territory from 0→1', 'Scaled growth in FL territory 5x']
  },
  
];

export const PROJECTS: Project[] = [
  { 
    title: 'RetroOS', 
    description: 'A fully functional desktop simulation environment inspired by 90s nostalgia.', 
    year: '2026', 
    tech: ['React', 'TS', 'Tailwind'],
    icon: '/retro-computer.png',
    iconType: 'image',
    githubUrl: 'https://github.com/tylerpalmer/retro-os',
    content: 'This project explores the intersection of nostalgic UI and modern web capabilities. It features a windowing system, a functional terminal with Gemini AI, and a suite of retro games.'
  },
  { 
    title: 'Scheeme', 
    description: 'High-performance pomodoro timer with team sync capabilities via WebSockets.', 
    year: '2026', 
    tech: ['Node.js', 'Redis', 'Next.js', 'Typescript', 'TailwindCSS', 'TipTap', 'Hocuspocus', 'ShadcnUI'],
    icon: '/scheemeIcon.png',
    iconType: 'image',
    url: 'https://tryscheeme.com',
    content: 'A productivity tool designed for remote teams. Uses real-time communication to allow squads to sync their focus sessions and breaks.'
  },
  { 
    title: 'VibeCheck Scanner', 
    description: 'Open source repo scanner that catches security leaks and informs on React best practices before production.', 
    year: '2026', 
    tech: ['React', 'TypeScript', 'Node.js', 'Security Analysis'],
    icon: '/assets/vibecheck/vibe-check.png',
    iconType: 'image',
    githubUrl: 'https://github.com/tapsuns5/VibeCheck-Scanner',
    url: 'https://vibecheck.tylerpalmer5.com',
    content: 'A comprehensive security and best practices scanner for React repositories. Features 50+ security checks, Prisma security validation, Next.js pattern detection, and real-time terminal interface for monitoring scan results.'
  }
];

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  return await getAllBlogPosts();
};
