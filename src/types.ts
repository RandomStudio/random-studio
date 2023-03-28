export interface VideoData {
  baseUrl: string,
  blur: string,
  fallback: string,
  height,
  hls: string,
  sources: string[],
  width,
}

export interface Image {
  id: string,
  imageData: ImageData
};

export type OpenGraph = {
  description: string,
  title: string,
  twitterCard: string,
  image: ImageData,
};

export type RelatedProject = {
  title: string,
  slug: string,
  intro: string,
  featuredImage: Image
  featuredVideo: VideoData,
};

export type Slide = {
  id: string,
  image: Image,
  video: VideoData,
}

export const BLOCK_TYPES = {
  CarouselBlockRecord: 'CarouselBlockRecord',
  HorizontalRowRecord: 'HorizontalRowRecord',
  ImageBlockRecord: 'ImageBlockRecord',
  TextBlockRecord: 'TextBlockRecord',
  VideoBlockRecord: 'VideoBlockRecord',
} as const;

type GenericBlockAttributes = {
  id: string,
  marginLeft: number,
  marginTop: number,
  width: number,
}

export type VideoBlock = {
  __typename: "VideoBlockRecord",
  autoplay: boolean,
  caption: string,
  hasAudio: boolean,
  hasControls: boolean,
  loops: boolean,
  video: VideoData,
} & GenericBlockAttributes;

export type TextBlock = {
  __typename: "TextBlockRecord",
  text: string,
} & GenericBlockAttributes;

export type ImageBlock = {
  __typename: "ImageBlockRecord",
  caption: string,
  image: Image,
} & GenericBlockAttributes;

export type CarouselBlock = {
  __typename: "CarouselBlockRecord",
  slides: Slide[]
  video: VideoData,
  image: ImageData
} & GenericBlockAttributes;

export type HorizontalRowBlock = {
  __typename: "HorizontalRowRecord",
  blocks: ContentBlockType[],
} & GenericBlockAttributes;

export type ContentBlockType = CarouselBlock | ImageBlock | TextBlock | VideoBlock;
