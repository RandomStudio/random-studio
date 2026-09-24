export type ContentBlock = {
  colSpan: number;
  colStart: number;
  isFullWidth?: boolean;
  alignment?: "start" | "center" | "end";
} & (
  | {
      image: string;
      type: "image";
    }
  | {
      image: string;
      type: "video";
    }
  | {
      type: "text";
      title: string;
      // Shorter label for the section nav, falls back to title
      navTitle?: string;
      copy: string[];
      moreInfo?: unknown;
    }
  | {
      type: "gallery";
      images: string[];
      info?: unknown;
    }
);

export type Section = {
  id: string;
  number: number;
  title: string;
  images: string[];
};

const MAX_SECTION_IMAGES = 3;

export const content: ContentBlock[] = [
  {
    colSpan: 20,
    colStart: 1,
    type: "image",
    image: "/project/header.png",
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
    type: "image",
    image: "/project/01_a.png",
  },
  {
    colSpan: 20,
    colStart: 1,
    type: "text",
    title: "Spatial Design Inspired by Temple Architecture",
    isFullWidth: false,
    copy: [
      "To demarcate the space in the HQ's grand foyer and immerse visitors in a contemplative atmosphere, we drew on the architectural style of a hypostyle temple. An airy hall propped up by multiple columns creates a calm space with its own shifting rhythms. Transparent curtains filter out the outside while an interplay of a sound and a central light sphere, that changes in intensity and tone throughout the day, animate the space making each visit unique.",
    ],
  },
  {
    colSpan: 7,
    colStart: 1,
    type: "image",
    image: "/project/02.png",
  },
  {
    colStart: 11,
    colSpan: 10,
    type: "image",
    image: "/project/03.png",
  },
  {
    colSpan: 20,
    colStart: 1,
    type: "video",
    image: "/project/04.mp4",
  },
  {
    colSpan: 10,
    colStart: 1,
    type: "image",
    image: "/project/05.png",
  },
  {
    colSpan: 7,
    colStart: 13,
    type: "image",
    image: "/project/06.png",
    alignment: "center",
  },
  {
    colSpan: 20,
    colStart: 1,
    type: "text",
    title: "Materiality and Touch at the Centre",
    isFullWidth: false,
    copy: [
      "Drawing attention to materiality, the hall itself is fashioned out of recycled textiles – even the colonnades are enveloped in a soft material that invites visitors to experience the space through touch. Each of the fabrics on display can be encountered through several layers: mannequins that sport 22 full looks are dotted throughout the forest of columns, and behind each, a totem displays samples of the fabric the garments are made from that visitors are encouraged to feel and read about through a tag outlining information about each sample.",
    ],
  },
  {
    colSpan: 7,
    colStart: 1,
    type: "image",
    image: "/project/07_a.png",
  },
  {
    colSpan: 13,
    colStart: 8,
    type: "image",
    image: "/project/08.png",
  },
  {
    colSpan: 14,
    colStart: 1,
    type: "video",
    image: "/project/8.mp4",
  },
  {
    colSpan: 6,
    colStart: 15,
    type: "image",
    image: "/project/09.png",
  },
  {
    colSpan: 20,
    colStart: 1,
    type: "text",
    title: "A Manifesto of Materials",
    isFullWidth: false,
    copy: [
      "At the core of the 200 square meter space, visitors can read a printed manifesto that conveys a detailed breakdown of the composition and sourcing of the materials on view.",
    ],
  },
  {
    colSpan: 6,
    colStart: 5,
    type: "image",
    image: "/project/10.png",
  },
  {
    colSpan: 10,
    colStart: 11,
    type: "image",
    image: "/project/11.png",
  },
  {
    colSpan: 20,
    colStart: 1,
    type: "gallery",
    images: [
      "/project/12_a.png",
      "/project/12_b.png",
      "/project/12_c.png",
      "/project/12_d.png",
      "/project/12_e.png",
      "/project/12_f.png",
      "/project/12_g.png",
      "/project/12_h.png",
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
    image: "/project/13.png",
  },
];

export const getSectionId = (number: number) => `section-${number}`;

// Each text block starts a section. Images before the first text block belong
// to the first section.
export const getSections = (blocks: ContentBlock[]): Section[] => {
  const sections: Section[] = [];
  let leadingImages: string[] = [];

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
          : [];

    const current = sections[sections.length - 1];

    if (current) {
      current.images.push(...images);
    } else {
      leadingImages.push(...images);
    }
  });

  return sections.map((section) => ({
    ...section,
    images: section.images.slice(0, MAX_SECTION_IMAGES),
  }));
};
