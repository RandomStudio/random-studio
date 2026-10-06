export type LinkGroup = {
  heading: string;
  links: string[];
};

export type Office = {
  city: string;
  address: string[];
  phone: string;
};

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
