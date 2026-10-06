import type { ImageMetadata } from "astro";

import image01A from "../assets/project/01_a.png";
import image01C from "../assets/project/01_c.png";
import image01D from "../assets/project/01_d.jpg";
import image01E from "../assets/project/01_e.jpg";
import image02 from "../assets/project/02.png";
import image03 from "../assets/project/03.png";
import image05 from "../assets/project/05.png";
import image06 from "../assets/project/06.png";
import image07A from "../assets/project/07_a.png";
import image08 from "../assets/project/08.png";
import image09 from "../assets/project/09.png";
import image10 from "../assets/project/10.png";
import image11 from "../assets/project/11.png";
import image12A from "../assets/project/12_a.png";
import image12B from "../assets/project/12_b.png";
import image12C from "../assets/project/12_c.png";
import image12D from "../assets/project/12_d.png";
import image12E from "../assets/project/12_e.png";
import image12F from "../assets/project/12_f.png";
import image12G from "../assets/project/12_g.png";
import image12H from "../assets/project/12_h.png";
import image13 from "../assets/project/13.png";
import headerImage from "../assets/project/header.png";
import moreInfoImage01 from "../assets/project/more-info/01.png";
import moreInfoPoster02 from "../assets/project/more-info/02.png";
import moreInfoImage03 from "../assets/project/more-info/03.png";
import moreInfoImage04 from "../assets/project/more-info/04.png";
import moreInfoImage05 from "../assets/project/more-info/05.png";

export type Video = {
  src: string;
  width: number;
  height: number;
};

export type MoreInfoBlock =
  | {
      type: "text";
      copy: string[];
    }
  | {
      type: "image";
      image: ImageMetadata;
      panelWidthPercentage: number;
    }
  | {
      type: "video";
      video: Video;
      poster: ImageMetadata;
      panelWidthPercentage: number;
    };

export type GalleryInfo = {
  title: string;
  text: string[];
};

export type MoreInfo = {
  title: string;
  teaser: string;
  content: MoreInfoBlock[];
};

export type SlideshowSlide = {
  images: ImageMetadata[];
  alt?: string;
};

export type ContentBlock = {
  colSpan: number;
  colStart: number;
  isFullWidth?: boolean;
  alignment?: "start" | "center" | "end";
} & (
  | {
      image: ImageMetadata;
      alt?: string;
      type: "image";
    }
  | {
      video: Video;
      alt?: string;
      type: "video";
    }
  | {
      type: "text";
      title: string;
      // Shorter label for the section nav, falls back to title
      navTitle?: string;
      copy: string[];
      moreInfo?: MoreInfo;
    }
  | {
      type: "gallery";
      images: ImageMetadata[];
      info?: GalleryInfo;
    }
  | {
      type: "slideshow";
      slides: SlideshowSlide[];
    }
);

export type Slide = { alt: string } & (
  { type: "image"; image: ImageMetadata } | { type: "video"; video: Video }
);

export type Section = {
  id: string;
  number: number;
  title: string;
  images: ImageMetadata[];
};

export const MAX_SECTION_PREVIEW_IMAGES = 3;

export const content: ContentBlock[] = [
  {
    colSpan: 20,
    colStart: 1,
    type: "image",
    image: headerImage,
    alt: "Exhibition Exterior, Daytime",
  },
  {
    colSpan: 20,
    colStart: 1,
    type: "text",
    title: "Past and Future fabrics exhibition for Zara",
    navTitle: "Introduction",
    isFullWidth: false,
    copy: [
      "Our second project for Zara’s headquarters in Galicia, Spain is a fabrics exhibition; an in-house exhibition that inspires and educates staff on the creative potential of recycled fabrics.",
      "We translated information about three different families of fabric into a tactile, spatial experience, inviting visitors to step out of their everyday work routine, slow down, discover the touch of each sample and learn about how it is sourced.",
    ],
  },
  {
    colSpan: 20,
    colStart: 1,
    type: "slideshow",
    slides: [
      { images: [image01A] },
      { images: [image01C] },
      {
        images: [image01D, image01E],
      },
    ],
  },
  {
    colSpan: 20,
    colStart: 1,
    type: "text",
    title: "Spatial Design Inspired by Temple Architecture",
    isFullWidth: false,
    navTitle: "Spatial Design",
    copy: [
      "To demarcate the space in the HQ's grand foyer and immerse visitors in a contemplative atmosphere, we drew on the architectural style of a hypostyle temple. An airy hall propped up by multiple columns creates a calm space with its own shifting rhythms. Transparent curtains filter out the outside while an interplay of a sound and a central light sphere, that changes in intensity and tone throughout the day, animate the space making each visit unique.",
    ],
    moreInfo: {
      title: "Hypostyle Forms",
      teaser: "Juxtaposing classical forms against contemporary materiality",
      content: [
        {
          type: "text",
          copy: [
            "Repetitive forms of the colonnade provide shape to the space, the towering appearance of the colonnade are juxtaposed against the soft, delicate structure of the fabrics.",
            "This play on architectural forms provided reference for our spatial design: structural harmony and a sense of order benefitted the over 120 different fabrics on display, allowing visitors to navigate through each family of the fabric construction.",
          ],
        },
        {
          type: "image",
          image: moreInfoImage01,
          panelWidthPercentage: 100,
        },
        {
          type: "video",
          video: {
            src: "/project/more-info/02.mp4",
            width: 1080,
            height: 1080,
          },
          poster: moreInfoPoster02,
          panelWidthPercentage: 100,
        },
        {
          type: "text",
          copy: [
            "Earlier designs more directly referenced a traditional temple like structure. In the end, this layout proved too ordered, imposing a hierarchy on the fabrics. This resulted in the final, more uniform layout, allowing the visitors to choose based on material family and construction.",
          ],
        },
        {
          type: "image",
          image: moreInfoImage03,
          panelWidthPercentage: 78.5,
        },
        {
          type: "image",
          image: moreInfoImage04,
          panelWidthPercentage: 75.3,
        },
        {
          type: "image",
          image: moreInfoImage05,
          panelWidthPercentage: 87.8,
        },
      ],
    },
  },
  {
    colSpan: 7,
    colStart: 1,
    type: "image",
    image: image02,
  },
  {
    colStart: 11,
    colSpan: 10,
    type: "image",
    image: image03,
  },
  {
    colSpan: 20,
    colStart: 1,
    type: "video",
    video: { src: "/project/04.mp4", width: 1920, height: 1000 },
  },
  {
    colSpan: 10,
    colStart: 1,
    type: "image",
    image: image05,
  },
  {
    colSpan: 7,
    colStart: 13,
    type: "image",
    image: image06,
    alignment: "center",
  },
  {
    colSpan: 20,
    colStart: 1,
    type: "text",
    title: "Materiality and Touch at the Centre",
    navTitle: "Materiality",
    isFullWidth: false,
    copy: [
      "Drawing attention to materiality, the hall itself is fashioned out of recycled textiles – even the colonnades are enveloped in a soft material that invites visitors to experience the space through touch. Each of the fabrics on display can be encountered through several layers: mannequins that sport 22 full looks are dotted throughout the forest of columns, and behind each, a totem displays samples of the fabric the garments are made from that visitors are encouraged to feel and read about through a tag outlining information about each sample.",
    ],
  },
  {
    colSpan: 7,
    colStart: 1,
    type: "image",
    image: image07A,
  },
  {
    colSpan: 13,
    colStart: 8,
    type: "image",
    image: image08,
  },
  {
    colSpan: 14,
    colStart: 1,
    type: "video",
    video: { src: "/project/8.mp4", width: 1080, height: 1080 },
    alt: "Fabric Totems - Interaction Animation",
  },
  {
    colSpan: 6,
    colStart: 15,
    type: "image",
    image: image09,
  },
  {
    colSpan: 20,
    colStart: 1,
    type: "text",
    title: "A Manifesto of Materials",
    navTitle: "Manifesto",
    isFullWidth: false,
    copy: [
      "At the core of the 200 square meter space, visitors can read a printed manifesto that conveys a detailed breakdown of the composition and sourcing of the materials on view.",
    ],
  },
  {
    colSpan: 6,
    colStart: 5,
    type: "image",
    image: image10,
  },
  {
    colSpan: 10,
    colStart: 11,
    type: "image",
    image: image11,
  },
  {
    colSpan: 20,
    colStart: 1,
    type: "gallery",
    images: [
      image12A,
      image12B,
      image12C,
      image12D,
      image12E,
      image12F,
      image12G,
      image12H,
    ],
    info: {
      title: "Working onsite in Galicia with Acierta.",
      text: [
        "A key part of our process is the design guardianship throughout the production phase, including onsite development. Working closely in tandem with our partners has long ensured our project outcomes.",
      ],
    },
  },
  {
    colSpan: 20,
    colStart: 1,
    type: "image",
    image: image13,
  },
];

export const getSectionId = (number: number) => `section-${number}`;

const getSlideMedia = (slide: Slide) =>
  slide.type === "image" ? slide.image : slide.video;

export const getSlides = (blocks: ContentBlock[]): Slide[] =>
  blocks.flatMap((block): Slide[] => {
    if (block.type === "image") {
      return [{ type: "image", image: block.image, alt: block.alt ?? "" }];
    }

    if (block.type === "video") {
      return [{ type: "video", video: block.video, alt: block.alt ?? "" }];
    }

    if (block.type === "gallery") {
      return block.images.map((image) => ({
        type: "image",
        image,
        alt: "",
      }));
    }

    if (block.type === "slideshow") {
      return block.slides.flatMap((slide) =>
        slide.images.map((image) => ({
          type: "image",
          image,
          alt: slide.alt ?? "",
        })),
      );
    }

    return [];
  });

export const slides = getSlides(content);

export const getSlideIndex = (media: ImageMetadata | Video) =>
  slides.findIndex((slide) => getSlideMedia(slide) === media);

// Each text block starts a section. Images before the first text block belong
// to the first section.
export const getSections = (blocks: ContentBlock[]): Section[] => {
  const sections: Section[] = [];
  let leadingImages: ImageMetadata[] = [];

  blocks.forEach((block) => {
    if (block.type === "text") {
      const number = sections.length + 1;

      sections.push({
        id: getSectionId(number),
        number,
        title: block.navTitle ?? block.title,
        images: leadingImages,
      });
      leadingImages = [];

      return;
    }

    const images =
      block.type === "image"
        ? [block.image]
        : block.type === "gallery"
          ? block.images
          : block.type === "slideshow"
            ? block.slides.flatMap((slide) => slide.images)
            : [];

    const current = sections[sections.length - 1];

    if (current) {
      current.images.push(...images);
    } else {
      leadingImages.push(...images);
    }
  });

  return sections;
};
