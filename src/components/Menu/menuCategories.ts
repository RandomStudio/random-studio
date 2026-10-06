import type { ImageMetadata } from "astro";

import navImage01 from "../../assets/project/nav_01.png";
import navImage02 from "../../assets/project/nav_02.png";
import navImage03 from "../../assets/project/nav_03.png";
import navImage04 from "../../assets/project/nav_04.png";

export type Category = {
  id: string;
  name: string;
  image: ImageMetadata;
};

export const categories: Category[] = [
  {
    id: "all",
    name: "All",
    image: navImage01,
  },
  {
    id: "applied-innovation",
    name: "Applied Innovation",
    image: navImage03,
  },
  {
    id: "experiential-retail",
    name: "Experiential Retail",
    image: navImage02,
  },
  {
    id: "exhibition",
    name: "Exhibition & Events",
    image: navImage04,
  },
];
