export type BunnyVideoDetails = {
  videoLibraryId: number;
  guid: string;
  title: string;
  dateUploaded: string;
  views: number;
  isPublic: boolean;
  length: number;
  status: number;
  framerate: number;
  rotation: number;
  width: number;
  height: number;
  availableResolutions: string;
  thumbnailCount: number;
  encodeProgress: number;
  storageSize: number;
  hasMP4Fallback: boolean;
  collectionId: string;
  thumbnailFileName: string;
  averageWatchTime: number;
  totalWatchTime: number;
  category: string;
};

export interface VideoData {
  baseUrl: string;
  blur?: {
    thumbnail: string;
    dominantColor: string;
  };
  downloadUrl: string;
  fallback: string;
  guid: string;
  height: number;
  hls: string;
  width: number;
}

export type RelatedProject = {
  title: string;
  slug: string;
  intro: string;
  featuredImage: Image;
  featuredVideo: VideoData;
};
export type SimpleProject = {
  featuredImage: Image;
  id: string;
  slug: string;
  title: string;
  intro: string;
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
  content: ContentBlock[];
};

export type ImageData = {
  alt?: string;
  aspectRatio: number;
  base64: string;
  bgColor: string;
  height: number;
  sizes: string;
  src: string;
  srcSet: string;
  title?: string;
  webpSrcSet?: string;
  width: number;
};

export interface Image {
  id: string;
  imageData: ImageData;
}

export type OpenGraph = {
  description: string;
  title: string;
  twitterCard: string;
  image: Image;
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
  imageData?: ImageData;
  video?: VideoData;
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
  blocks: ContentBlock[];
} & GenericBlockAttributes;

export type ContentBlock = CarouselBlock | ImageBlock | TextBlock | VideoBlock;

export type SustainabilityBlock = {
  image: Image;
  color: string[];
  title: string;
  text: string;
  textFirst: boolean;
};

export type DayNightImageBlock = {
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
