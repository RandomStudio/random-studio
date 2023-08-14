export interface VideoData {
  baseUrl: string;
  blur: string;
  fallback: string;
  height;
  hls: string;
  sources: string[];
  width;
}

export type RelatedProject = {
  title: string;
  slug: string;
  intro: string;
  featuredImage: Image;
  featuredVideo: VideoData;
};

export type Project = {
  id: string;
  slug: string;
  intro: string;
  title: string;
  details: {
    [key: string]: string;
  };
  featuredImage: Image;
  featuredVideo: VideoData;
  relatedProjectsTitle: string;
  relatedProjects: RelatedProject[];
  tags: string[];
  opengraph: OpenGraph;
  content: ContentBlockType[];
};

export interface Image {
  id: string;
  imageData: ImageData;
}

export type OpenGraph = {
  description: string;
  title: string;
  twitterCard: string;
  image: ImageData;
};

export type ProjectSummary = {
  title: string;
  slug: string;
  intro: string;
  featuredImage: Image;
  featuredVideo: VideoData;
  tags: string[];
};

export type Slide = {
  id: string;
  imageData?: Image;
  video?: VideoData;
  image: Image;
};

export type CreditsType = {
  link: string;
  label: string;
  text: string;
};

export const BLOCK_TYPES = {
  CarouselBlockRecord: 'CarouselBlockRecord',
  HorizontalRowRecord: 'HorizontalRowRecord',
  ImageBlockRecord: 'ImageBlockRecord',
  TextBlockRecord: 'TextBlockRecord',
  VideoBlockRecord: 'VideoBlockRecord',
} as const;

export type GenericBlockAttributes = {
  anchorId: string;
  id: string;
  marginLeft: number;
  marginTop: number;
  width: number;
  title: string;
};

export type VideoBlock = {
  __typename: 'VideoBlockRecord';
  autoplay: boolean;
  caption: string;
  hasAudio: boolean;
  hasControls: boolean;
  loops: boolean;
  video: VideoData;
} & GenericBlockAttributes;

export type TextBlock = {
  __typename: 'TextBlockRecord';
  text: string;
} & GenericBlockAttributes;

export type ImageBlock = {
  __typename: 'ImageBlockRecord';
  caption: string;
  image: Image;
} & GenericBlockAttributes;

export type CarouselBlock = {
  __typename: 'CarouselBlockRecord';
  slides: Slide[];
  title: string;
  video: VideoData;
  image: ImageData;
} & GenericBlockAttributes;

export type HorizontalRowBlock = {
  __typename: 'HorizontalRowRecord';
  blocks: ContentBlockType[];
} & GenericBlockAttributes;

export type ContentBlockType =
  | CarouselBlock
  | ImageBlock
  | TextBlock
  | VideoBlock;

export type DayNightImageBlockType = {
  __typename: string;
  copy: string;
  image: Image;
  nightImage: Image;
};

export type Vacancy = {
  title: string;
  description: string;
  url: string;
  id: string;
  _publishedAt: string;
};
