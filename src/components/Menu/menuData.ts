export type Category = {
  id: string;
  name: string;
  image: string;
};

export type LinkGroup = {
  heading: string;
  links: string[];
};

export type Office = {
  city: string;
  address: string[];
  phone: string;
};

export const categories: Category[] = [
  {
    id: "all",
    name: "All",
    image: "/project/nav_01.png",
  },
  {
    id: "applied-innovation",
    name: "Applied Innovation",
    image: "/project/nav_03.png",
  },
  {
    id: "experiential-retail",
    name: "Experiential Retail",
    image: "/project/nav_02.png",
  },
  {
    id: "exhibition",
    name: "Exhibition & Events",
    image: "/project/nav_04.png",
  },
];

export const defaultCategoryId = "all";

export const linkGroups: LinkGroup[] = [
  {
    heading: "Connect",
    links: ["Newsletter", "Instagram", "LinkedIn", "Medium"],
  },
  {
    heading: "Emails",
    links: ["Business", "Press", "Studio", "Vendors"],
  },
];

export const offices: Office[] = [
  {
    city: "Amsterdam",
    address: [
      "Gillis van Ledenberchstraat 112",
      "1052 VK Amsterdam",
      "The Netherlands",
    ],
    phone: "+31 20 779 7735",
  },
  {
    city: "Paris",
    address: ["174 Quai de Jemmapes", "75010 Paris France"],
    phone: "+33 1 40 36 41 44",
  },
];
