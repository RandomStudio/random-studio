import type { AsPlainObject, Options } from "minisearch";

export type SearchDocument = {
  id: string;
  title: string;
  slug: string;
  categories: string[];
  body: string;
};

export type SearchField = "title" | "categories" | "body";

export type SerialisedSearchIndex = {
  index: AsPlainObject;
  documents: SearchDocument[];
};

export const SEARCH_INDEX_URL = "/search-index.json";

export const SEARCH_OPTIONS: Options<SearchDocument> = {
  fields: ["title", "categories", "body"] satisfies SearchField[],
  extractField: (document, field) =>
    field === "categories"
      ? document.categories.join(" ")
      : document[field as keyof SearchDocument],
};
