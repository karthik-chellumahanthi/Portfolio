/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  tags: string[];
  techStack: string[];
  outcomes: string[];
  metrics?: { label: string; value: string }[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface Experience {
  role: string;
  organization: string;
  location: string;
  duration: string;
  bullets: string[];
  isInternship: boolean;
}

export interface Certification {
  name: string;
  issuer: string;
  details: string;
}

// JNTUK App Simulator States
export type ActiveTab = 'home' | 'downloads' | 'more' | 'profile';

export interface Subject {
  id: string;
  name: string;
  units: string[];
}

export interface Semester {
  id: string;
  name: string;
  subjects: Subject[];
}

export interface Regulation {
  id: string;
  name: string;
  semesters: Semester[];
}

export interface DownloadedItem {
  id: string;
  title: string;
  subject: string;
  size: string;
  downloadedAt: string;
}

export interface HistoryItem {
  id: string;
  title: string;
  subject: string;
  openedAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
}
