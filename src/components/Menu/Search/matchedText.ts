export type TextSegment = {
  text: string;
  isMatch: boolean;
};

const WORD_PATTERN = /[^\n\r\p{Z}\p{P}]+/gu;

const EXCERPT_CONTEXT_LENGTH = 40;

export const collapseWhitespace = (text: string) =>
  text.replaceAll(/\s+/g, " ").trim();

export const toWords = (text: string) =>
  text.match(WORD_PATTERN)?.map((word) => word.toLocaleLowerCase()) ?? [];

const getMatchLength = (
  word: string,
  matchedTerms: Set<string>,
  queryTerms: string[],
) => {
  const normalisedWord = word.toLocaleLowerCase();

  if (!matchedTerms.has(normalisedWord)) {
    return 0;
  }

  const longestPrefixLength = Math.max(
    0,
    ...queryTerms
      .filter((queryTerm) => normalisedWord.startsWith(queryTerm))
      .map((queryTerm) => queryTerm.length),
  );

  return longestPrefixLength || word.length;
};

export const highlightMatches = (
  text: string,
  matchedTerms: Set<string>,
  queryTerms: string[],
): TextSegment[] => {
  const segments: TextSegment[] = [];
  let unmatchedStart = 0;

  for (const { 0: word, index } of text.matchAll(WORD_PATTERN)) {
    const matchLength = getMatchLength(word, matchedTerms, queryTerms);

    if (matchLength > 0) {
      segments.push(
        { text: text.slice(unmatchedStart, index), isMatch: false },
        { text: text.slice(index, index + matchLength), isMatch: true },
      );
      unmatchedStart = index + matchLength;
    }
  }

  segments.push({ text: text.slice(unmatchedStart), isMatch: false });

  return segments.filter((segment) => segment.text !== "");
};

export const createExcerpt = (text: string, matchedTerms: Set<string>) => {
  const firstMatchIndex =
    text
      .matchAll(WORD_PATTERN)
      .find(({ 0: word }) => matchedTerms.has(word.toLocaleLowerCase()))
      ?.index ?? 0;
  const start = Math.max(0, firstMatchIndex - EXCERPT_CONTEXT_LENGTH);
  const end = firstMatchIndex + EXCERPT_CONTEXT_LENGTH * 2;
  const excerpt = text
    .slice(start, end)
    .replace(start > 0 ? /^\S*\s/ : /^/, "")
    .replace(end < text.length ? /\s\S*$/ : /$/, "");

  return `${start > 0 ? "…" : ""}${excerpt}${end < text.length ? "…" : ""}`;
};
