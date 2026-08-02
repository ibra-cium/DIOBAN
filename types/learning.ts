export type LanguageCode = 'en' | 'es' | 'fr' | 'de' | 'it' | 'ja' | 'bn';

export interface Language {
  id: LanguageCode;
  name: string;
  nativeName: string;
  flagIcon: string;
}

export interface Vocabulary {
  id: string;
  word: string;
  translation: string;
  pronunciation?: string;
}

export interface Phrase {
  id: string;
  text: string;
  translation: string;
  pronunciation?: string;
}

export type ActivityType =
  | 'vocabulary'
  | 'phrase'
  | 'ai_teacher_video'
  | 'ai_tutor_chat'
  | 'quiz';

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description?: string;
  // For vocabulary or phrase activities
  vocabularyItems?: Vocabulary[];
  phrases?: Phrase[];
  // For AI activities
  aiPrompt?: string;
}

export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  description: string;
  order: number;
  goals: string[];
  activities: Activity[];
}

export interface Unit {
  id: string;
  languageId: LanguageCode;
  title: string;
  description: string;
  order: number;
}
