export interface VideoData {
  baseUrl: string,
  blur: string,
  fallback: string,
  height,
  hls: string,
  sources: string[],
  width,
}

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
  featuredImage: {
    id: string,
    imageData: ImageData
  },
  featuredVideo: VideoData,
};

export type Slide = {
  id: string,
  image: ImageData,
  video: VideoData,
}

export const BLOCK_TYPES = {
  CarouselBlockRecord: 'CarouselBlockRecord',
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
  image: {
    id: string,
    imageData: ImageData
  }
} & GenericBlockAttributes;

export type CarouselBlock = {
  __typename: "CarouselBlockRecord",
  slides: Slide[]
  video: VideoData,
  image: ImageData
} & GenericBlockAttributes;

export type ContentBlockType = CarouselBlock | ImageBlock | TextBlock | VideoBlock;
