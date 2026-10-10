const WORDS_PER_MINUTE = 225;

export interface ReadingTime {
  minutes: number;
  words: number;
  text: string;
}

export function calculateReadingTime(content: string): ReadingTime {
  const words = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#*_`>\[\]()]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
  return { minutes, words, text: `${minutes} min read` };
}
