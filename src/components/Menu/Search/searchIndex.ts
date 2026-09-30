import MiniSearch from "minisearch";
import type { MatchInfo } from "minisearch";

import {
  collapseWhitespace,
  createExcerpt,
  highlightMatches,
  toWords,
} from "./matchedText";
import type { TextSegment } from "./matchedText";
import { SEARCH_INDEX_URL, SEARCH_OPTIONS } from "./searchConfig";
import type {
  SearchDocument,
  SearchField,
  SerialisedSearchIndex,
} from "./searchConfig";

type GroupKind = "exact" | "category" | "title" | "body";

type ResultGroup = {
  kind: GroupKind;
  heading?: string;
};

type SearchMatch = {
  document: SearchDocument;
  match: MatchInfo;
  queryTerms: string[];
};

export type LoadedSearchIndex = {
  miniSearch: MiniSearch<SearchDocument>;
  documentsById: Map<string, SearchDocument>;
};

export type SearchResult = {
  slug: string;
  segments: TextSegment[];
};

export type SearchResultGroup = {
  heading?: string;
  results: SearchResult[];
};

const GROUP_ORDER: GroupKind[] = ["exact", "category", "title", "body"];

const EXACT_MATCH_HEADING = "Exact Match";

const normalise = (text: string) =>
  collapseWhitespace(text).toLocaleLowerCase();

const getTermsInField = (match: MatchInfo, field: SearchField) =>
  new Set(
    Object.entries(match)
      .filter(([, fields]) => fields.includes(field))
      .map(([term]) => term),
  );

const findMatchedCategory = ({ document, match }: SearchMatch) => {
  const categoryTerms = getTermsInField(match, "categories");

  return document.categories.find((category) =>
    toWords(category).some((word) => categoryTerms.has(word)),
  );
};

const getResultGroup = (
  searchMatch: SearchMatch,
  normalisedQuery: string,
): ResultGroup => {
  if (normalise(searchMatch.document.title) === normalisedQuery) {
    return { kind: "exact", heading: EXACT_MATCH_HEADING };
  }

  const matchedCategory = findMatchedCategory(searchMatch);

  if (matchedCategory) {
    return { kind: "category", heading: matchedCategory };
  }

  return getTermsInField(searchMatch.match, "title").size > 0
    ? { kind: "title" }
    : { kind: "body" };
};

const toSearchResult = (
  { document, match, queryTerms }: SearchMatch,
  kind: GroupKind,
): SearchResult => {
  if (kind === "body") {
    const bodyTerms = getTermsInField(match, "body");

    return {
      slug: document.slug,
      segments: highlightMatches(
        createExcerpt(document.body, bodyTerms),
        bodyTerms,
        queryTerms,
      ),
    };
  }

  return {
    slug: document.slug,
    segments: highlightMatches(
      document.title,
      getTermsInField(match, "title"),
      queryTerms,
    ),
  };
};

const toGroupKey = ({ kind, heading }: ResultGroup) =>
  `${kind}:${heading ?? ""}`;

const findMatches = (
  { miniSearch, documentsById }: LoadedSearchIndex,
  normalisedQuery: string,
): SearchMatch[] =>
  miniSearch
    .search(normalisedQuery, { prefix: true, combineWith: "AND" })
    .flatMap(({ id, match, queryTerms }) => {
      const document = documentsById.get(id);

      return document ? [{ document, match, queryTerms }] : [];
    });

export const loadSearchIndex = async (): Promise<LoadedSearchIndex> => {
  const response = await fetch(SEARCH_INDEX_URL);
  const { index, documents }: SerialisedSearchIndex = await response.json();

  return {
    miniSearch: await MiniSearch.loadJSAsync(index, SEARCH_OPTIONS),
    documentsById: new Map(
      documents.map((document) => [document.id, document]),
    ),
  };
};

export const searchProjects = (
  searchIndex: LoadedSearchIndex,
  query: string,
): SearchResultGroup[] => {
  const normalisedQuery = normalise(query);

  if (normalisedQuery === "") {
    return [];
  }

  const placedResults = findMatches(searchIndex, normalisedQuery).map(
    (searchMatch) => {
      const group = getResultGroup(searchMatch, normalisedQuery);

      return { group, result: toSearchResult(searchMatch, group.kind) };
    },
  );

  return [
    ...Map.groupBy(placedResults, ({ group }) => toGroupKey(group)).values(),
  ]
    .toSorted(
      ([first], [second]) =>
        GROUP_ORDER.indexOf(first.group.kind) -
        GROUP_ORDER.indexOf(second.group.kind),
    )
    .map((groupResults) => ({
      heading: groupResults[0].group.heading,
      results: groupResults.map(({ result }) => result),
    }));
};
