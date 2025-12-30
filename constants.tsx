
import React from 'react';
import { BookOpen, Headphones, Mic, PenTool, Layout, PieChart, Users, Award } from 'lucide-react';

export const COLORS = {
  primary: '#0ea5e9', // Sky 500
  secondary: '#f97316', // Orange 500
  accent: '#6366f1', // Indigo 500
};

export const PTE_QUESTION_TYPES = [
  { id: 'ra', title: 'Read Aloud', category: 'Speaking', icon: <Mic className="w-5 h-5" />, exam: 'PTE' },
  { id: 'rs', title: 'Repeat Sentence', category: 'Speaking', icon: <Headphones className="w-5 h-5" />, exam: 'PTE' },
  { id: 'swt', title: 'Summarize Written Text', category: 'Writing', icon: <PenTool className="w-5 h-5" />, exam: 'PTE' },
  { id: 'we', title: 'Write Essay', category: 'Writing', icon: <BookOpen className="w-5 h-5" />, exam: 'PTE' },
  { id: 'fib', title: 'Reading & Writing: Fill in the Blanks', category: 'Reading', icon: <Layout className="w-5 h-5" />, exam: 'PTE' },
];

export const FEATURES = [
  {
    title: 'AI Scoring Engine',
    description: 'Get instant, accurate scores using our advanced AI models calibrated to Pearson standards.',
    icon: <PieChart className="w-6 h-6 text-sky-500" />
  },
  {
    title: 'Real Exam Interface',
    description: 'Practice in an environment that exactly replicates the actual PTE and IELTS exam software.',
    icon: <Layout className="w-6 h-6 text-orange-500" />
  },
  {
    title: 'Sectional Tests',
    description: 'Focus on specific sections to master your weaknesses and build test-taking stamina.',
    icon: <Award className="w-6 h-6 text-indigo-500" />
  },
  {
    title: 'Performance Analysis',
    description: 'Track your progress with detailed analytics and expert tips to improve your band score.',
    icon: <Users className="w-6 h-6 text-emerald-500" />
  }
];
