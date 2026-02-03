
export type AppId = 'about' | 'projects' | 'skills' | 'terminal' | 'guestbook' | 'minesweeper' | 'snake' | 'writing' | 'vibecheck';

export interface WindowState {
  id: AppId;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  x: number;
  y: number;
}

export interface Project {
  title: string;
  description: string;
  year: string;
  tech: string[];
  icon: string;
  iconType?: 'emoji' | 'image';
  url?: string;
  content?: string;
  githubUrl?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export interface GuestbookEntry {
  name: string;
  message: string;
  date: string;
  aiResponse?: string;
}
