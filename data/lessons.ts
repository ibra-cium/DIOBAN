import { Lesson } from '../types/learning';

export const LESSONS: Lesson[] = [
  {
    id: 'lesson-es-1-1',
    unitId: 'unit-es-1',
    title: 'Say Hello',
    description: 'Learn to say hello and goodbye in Spanish.',
    order: 1,
    goals: ['Say hello', 'Say goodbye'],
    activities: [
      {
        id: 'act-es-1-1-1',
        type: 'vocabulary',
        title: 'Learn Greetings',
        vocabularyItems: [
          {
            id: 'vocab-es-hola',
            word: 'Hola',
            translation: 'Hello',
            pronunciation: 'oh-lah',
          },
          {
            id: 'vocab-es-adios',
            word: 'Adiós',
            translation: 'Goodbye',
            pronunciation: 'ah-dyos',
          },
        ],
      },
      {
        id: 'act-es-1-1-2',
        type: 'ai_teacher_video',
        title: 'Conversation Practice',
        description: 'Practice greetings with your AI teacher.',
        aiPrompt: 'You are a friendly Spanish teacher. Teach the user how to say "Hola" and "Adiós". Keep it simple and encouraging.',
      },
    ],
  },
  {
    id: 'lesson-fr-1-1',
    unitId: 'unit-fr-1',
    title: 'Say Hello',
    description: 'Learn to say hello and goodbye in French.',
    order: 1,
    goals: ['Say hello', 'Say goodbye'],
    activities: [
      {
        id: 'act-fr-1-1-1',
        type: 'vocabulary',
        title: 'Learn Greetings',
        vocabularyItems: [
          {
            id: 'vocab-fr-bonjour',
            word: 'Bonjour',
            translation: 'Hello',
            pronunciation: 'bohn-zhoor',
          },
          {
            id: 'vocab-fr-aurevoir',
            word: 'Au revoir',
            translation: 'Goodbye',
            pronunciation: 'oh-ruh-vwahr',
          },
        ],
      },
      {
        id: 'act-fr-1-1-2',
        type: 'ai_teacher_video',
        title: 'Conversation Practice',
        description: 'Practice greetings with your AI teacher.',
        aiPrompt: 'You are a friendly French teacher. Teach the user how to say "Bonjour" and "Au revoir". Keep it simple and encouraging.',
      },
    ],
  },
  {
    id: 'lesson-de-1-1',
    unitId: 'unit-de-1',
    title: 'Say Hello',
    description: 'Learn to say hello and goodbye in German.',
    order: 1,
    goals: ['Say hello', 'Say goodbye'],
    activities: [
      {
        id: 'act-de-1-1-1',
        type: 'vocabulary',
        title: 'Learn Greetings',
        vocabularyItems: [
          {
            id: 'vocab-de-hallo',
            word: 'Hallo',
            translation: 'Hello',
            pronunciation: 'hah-loh',
          },
          {
            id: 'vocab-de-tschuss',
            word: 'Tschüss',
            translation: 'Goodbye',
            pronunciation: 'choos',
          },
        ],
      },
      {
        id: 'act-de-1-1-2',
        type: 'ai_teacher_video',
        title: 'Conversation Practice',
        description: 'Practice greetings with your AI teacher.',
        aiPrompt: 'You are a friendly German teacher. Teach the user how to say "Hallo" and "Tschüss". Keep it simple and encouraging.',
      },
    ],
  },
  {
    id: 'lesson-bn-1-1',
    unitId: 'unit-bn-1',
    title: 'Say Hello',
    description: 'Learn to say hello and goodbye in Bangla.',
    order: 1,
    goals: ['Say hello', 'Say goodbye'],
    activities: [
      {
        id: 'act-bn-1-1-1',
        type: 'vocabulary',
        title: 'Learn Greetings',
        vocabularyItems: [
          {
            id: 'vocab-bn-salam',
            word: 'নমস্কার / সালাম',
            translation: 'Hello',
            pronunciation: 'naw-mosh-kar / sa-lam',
          },
          {
            id: 'vocab-bn-bidhay',
            word: 'বিদায়',
            translation: 'Goodbye',
            pronunciation: 'bee-daay',
          },
        ],
      },
      {
        id: 'act-bn-1-1-2',
        type: 'ai_teacher_video',
        title: 'Conversation Practice',
        description: 'Practice greetings with your AI teacher.',
        aiPrompt: 'You are a friendly Bangla teacher. Teach the user how to say hello and goodbye. Keep it simple and encouraging.',
      },
    ],
  },
];
