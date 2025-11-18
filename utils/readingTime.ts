/**
 * Calculate reading time for text content
 * Average reading speed: 200-250 words per minute for technical content
 * We use 225 WPM as a middle ground
 */

const WORDS_PER_MINUTE = 225;
const CODE_BLOCK_WEIGHT = 0.5; // Code takes ~50% longer to read

interface ReadingTimeResult {
  minutes: number;
  words: number;
  text: string;
}

/**
 * Calculate reading time from markdown or plain text
 */
export function calculateReadingTime(content: string): ReadingTimeResult {
  if (!content || typeof content !== 'string') {
    return { minutes: 0, words: 0, text: '0 min read' };
  }

  // Remove YAML frontmatter
  const withoutFrontmatter = content.replace(/^---[\s\S]*?---/, '');

  // Count code blocks separately (they take longer to read)
  const codeBlocks = withoutFrontmatter.match(/```[\s\S]*?```/g) || [];
  const codeWords = codeBlocks.reduce((acc, block) => {
    const words = block.split(/\s+/).length;
    return acc + words;
  }, 0);

  // Remove code blocks from main content
  const withoutCode = withoutFrontmatter.replace(/```[\s\S]*?```/g, '');

  // Remove markdown syntax
  const plainText = withoutCode
    .replace(/#{1,6}\s/g, '') // Headers
    .replace(/\*\*|__/g, '') // Bold
    .replace(/\*|_/g, '') // Italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Links
    .replace(/`([^`]+)`/g, '$1') // Inline code
    .replace(/^\s*[-*+]\s/gm, '') // Lists
    .replace(/^\s*\d+\.\s/gm, '') // Numbered lists
    .replace(/>\s/g, '') // Blockquotes
    .replace(/\n{2,}/g, '\n') // Multiple newlines
    .trim();

  // Count words in plain text
  const regularWords = plainText.split(/\s+/).filter(word => word.length > 0).length;

  // Adjust code words by weight factor
  const adjustedCodeWords = codeWords * (1 + CODE_BLOCK_WEIGHT);

  // Total word count
  const totalWords = regularWords + adjustedCodeWords;

  // Calculate reading time
  const minutes = Math.ceil(totalWords / WORDS_PER_MINUTE);

  // Generate readable text
  const text = minutes === 1 ? '1 min read' : `${minutes} min read`;

  return {
    minutes,
    words: Math.round(totalWords),
    text
  };
}

/**
 * Get a short summary of reading time (just the number)
 */
export function getReadingTimeMinutes(content: string): number {
  return calculateReadingTime(content).minutes;
}

/**
 * Get formatted reading time text
 */
export function getReadingTimeText(content: string): string {
  return calculateReadingTime(content).text;
}
