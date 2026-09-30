import type { TextSegment } from "../matchedText";
import type { SearchResult, SearchResultGroup } from "../searchIndex";

const createSegmentNode = ({ text, isMatch }: TextSegment) => {
  if (!isMatch) {
    return document.createTextNode(text);
  }

  const mark = document.createElement("mark");
  mark.textContent = text;

  return mark;
};

const createResultElement = ({ slug, segments }: SearchResult) => {
  const link = document.createElement("a");
  link.href = `/projects/${slug}`;
  link.append(...segments.map(createSegmentNode));

  const item = document.createElement("li");
  item.append(link);

  return item;
};

const createHeadingElement = (heading: string) => {
  const headingElement = document.createElement("h2");
  headingElement.textContent = heading;

  return headingElement;
};

const createGroupElement = ({ heading, results }: SearchResultGroup) => {
  const list = document.createElement("ul");
  list.append(...results.map(createResultElement));

  const group = document.createElement("section");
  group.append(...(heading ? [createHeadingElement(heading)] : []), list);

  return group;
};

export const createResultGroupElements = (groups: SearchResultGroup[]) =>
  groups.map(createGroupElement);
