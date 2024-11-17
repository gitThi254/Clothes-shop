import {
  RxCrop,
  RxDesktop,
  RxPencil2,
  RxReader,
  RxRocket,
  RxAccessibility,
} from "react-icons/rx";

import SpaceCity1 from "../assets/SpaceCity1.jpg";
import SpaceCity5 from "../assets/SpaceCity5.jpeg";
import SpaceCity6 from "../assets/SpaceCity6.jpeg";
import SpaceCity7 from "../assets/SpaceCity7.jpeg";
import SpaceCity8 from "../assets/SpaceCity8.jpeg";
import SpaceCity9 from "../assets/SpaceCity9.jpeg";
import hero1 from "../assets/hero1.webp";
import hero2 from "../assets/hero2.webp";
import hero3 from "../assets/hero3.webp";
import hero4 from "../assets/hero4.webp";
import category1 from "../assets/category1.webp";
import category2 from "../assets/category2.webp";
import category3 from "../assets/category3.webp";
import category4 from "../assets/category4.webp";
import category5 from "../assets/category5.webp";
import category6 from "../assets/category6.webp";
import category7 from "../assets/category7.webp";
import category8 from "../assets/category8.webp";
import category9 from "../assets/category9.webp";

import { IconType } from "react-icons/lib";

export interface Data {
  icon: IconType;
  title: string;
  content: string;
  backgroundImage: string;
}

export const ServiceData: Data[] = [
  {
    icon: RxCrop,
    title: "Development",
    content: "Lorem ipsum dolor sit /amet, consectetur adipiscing elit.",
    backgroundImage: SpaceCity9,
  },
  {
    icon: RxCrop,
    title: "Development",
    content: "Lorem ipsum dolor sit /amet, consectetur adipiscing elit.",
    backgroundImage: SpaceCity9,
  },
  {
    icon: RxCrop,
    title: "Development",
    content: "Lorem ipsum dolor sit /amet, consectetur adipiscing elit.",
    backgroundImage: SpaceCity9,
  },
  {
    icon: RxCrop,
    title: "Development",
    content: "Lorem ipsum dolor sit /amet, consectetur adipiscing elit.",
    backgroundImage: SpaceCity9,
  },
  {
    icon: RxCrop,
    title: "Development",
    content: "Lorem ipsum dolor sit /amet, consectetur adipiscing elit.",
    backgroundImage: SpaceCity9,
  },
  {
    icon: RxPencil2,
    title: "Branding",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    backgroundImage: SpaceCity1,
  },
  {
    icon: RxDesktop,
    title: "Design",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    backgroundImage: SpaceCity6,
  },
  {
    icon: RxReader,
    title: "Seo",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    backgroundImage: SpaceCity7,
  },
  {
    icon: RxAccessibility,
    title: "Management",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    backgroundImage: SpaceCity5,
  },
  {
    icon: RxRocket,
    title: "Production",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    backgroundImage: SpaceCity8,
  },
  {
    icon: RxCrop,
    title: "Development",
    content: "Lorem ipsum dolor sit /amet, consectetur adipiscing elit.",
    backgroundImage: SpaceCity9,
  },
  {
    icon: RxCrop,
    title: "Development",
    content: "Lorem ipsum dolor sit /amet, consectetur adipiscing elit.",
    backgroundImage: SpaceCity9,
  },
  {
    icon: RxCrop,
    title: "Development",
    content: "Lorem ipsum dolor sit /amet, consectetur adipiscing elit.",
    backgroundImage: SpaceCity9,
  },
  {
    icon: RxCrop,
    title: "Development",
    content: "Lorem ipsum dolor sit /amet, consectetur adipiscing elit.",
    backgroundImage: SpaceCity9,
  },
  {
    icon: RxCrop,
    title: "Development",
    content: "Lorem ipsum dolor sit /amet, consectetur adipiscing elit.",
    backgroundImage: SpaceCity9,
  },
  {
    icon: RxPencil2,
    title: "Branding",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    backgroundImage: SpaceCity1,
  },
  {
    icon: RxDesktop,
    title: "Design",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    backgroundImage: SpaceCity6,
  },
  {
    icon: RxReader,
    title: "Seo",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    backgroundImage: SpaceCity7,
  },
  {
    icon: RxAccessibility,
    title: "Management",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    backgroundImage: SpaceCity5,
  },
  {
    icon: RxRocket,
    title: "Production",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    backgroundImage: SpaceCity8,
  },
];

export interface Data1 {
  image: string;
}

export const ServiceData1: Data1[] = [
  {
    image: hero1,
  },
  {
    image: hero2,
  },
  {
    image: hero3,
  },
  {
    image: hero4,
  },
];

export const ServiceData2: Data1[] = [
  {
    image: category1,
  },
  {
    image: category2,
  },
  {
    image: category3,
  },
  {
    image: category4,
  },
  {
    image: category5,
  },
  {
    image: category6,
  },
  {
    image: category7,
  },
  {
    image: category8,
  },
  {
    image: category9,
  },
  {
    image: category2,
  },
  {
    image: category3,
  },
  {
    image: category4,
  },
  {
    image: category1,
  },
  {
    image: category2,
  },
  {
    image: category3,
  },
  {
    image: category4,
  },
  {
    image: category5,
  },
  {
    image: category6,
  },
  {
    image: category7,
  },
  {
    image: category8,
  },
  {
    image: category9,
  },
  {
    image: category2,
  },
  {
    image: category3,
  },
  {
    image: category4,
  },
];

type Filter = {
  name: string;
  filterValues: string[];
};

export const filter: Filter[] = [
  {
    name: "Category",
    filterValues: ["Snaker", "Flats", "Sandals", "Heels"],
  },
  {
    name: "Price",
    filterValues: ["All", "$0-50", "$50-$100", "$100-$150", "Over $150"],
  },
];

import {
  spfOne,
  spfTwo,
  spfThree,
  spfFour,
  bestSellerOne,
  bestSellerTwo,
  bestSellerThree,
  bestSellerFour,
  newArrOne,
  newArrTwo,
  newArrThree,
  newArrFour,
} from "../assets/images/index";

// =================== NavBarList Start here ====================
export const navBarList = [
  {
    _id: 1001,
    title: "Home",
    link: "/",
  },
  {
    _id: 1002,
    title: "Shop",
    link: "/shop",
  },
  {
    _id: 1003,
    title: "About",
    link: "/about",
  },
  {
    _id: 1004,
    title: "Contact",
    link: "contact",
  },
  {
    _id: 1005,
    title: "Journal",
    link: "/journal",
  },
];
// =================== NavBarList End here ======================
// =================== Special Offer data Start here ============
export const SplOfferData = [
  {
    _id: "201",
    img: spfOne,
    productName: "Cap for Boys",
    price: "35.00",
    color: "Blank and White",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "202",
    img: newArrFour,
    productName: "Tea Table",
    price: "180.00",
    color: "Gray",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "203",
    img: spfThree,
    productName: "Headphones",
    price: "25.00",
    color: "Mixed",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "204",
    img: spfFour,
    productName: "Sun glasses",
    price: "220.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
];
// =================== Special Offer data End here ==============

// =================== PaginationItems Start here ===============

export const paginationItems = [
  {
    _id: 1001,
    img: spfOne,
    productName: "Cap for Boys",
    price: "35.00",
    color: "Blank and White",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1002,
    img: spfTwo,
    productName: "Tea Table",
    price: "180.00",
    color: "Gray",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1003,
    img: spfThree,
    productName: "Headphones",
    price: "25.00",
    color: "Mixed",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1004,
    img: spfFour,
    productName: "Sun glasses",
    price: "220.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1005,
    img: bestSellerOne,
    productName: "Flower Base",
    price: "35.00",
    color: "Blank and White",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1006,
    img: bestSellerTwo,
    productName: "New Backpack",
    price: "180.00",
    color: "Gray",
    badge: false,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1007,
    img: bestSellerThree,
    productName: "Household materials",
    price: "25.00",
    color: "Mixed",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1008,
    img: bestSellerFour,
    productName: "Travel Bag",
    price: "220.00",
    color: "Black",
    badge: false,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1009,
    img: newArrOne,
    productName: "Round Table Clock",
    price: "44.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1010,
    img: newArrTwo,
    productName: "Smart Watch",
    price: "250.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1011,
    img: newArrThree,
    productName: "cloth Basket",
    price: "80.00",
    color: "Mixed",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1012,
    img: newArrFour,
    productName: "Funny toys for babies",
    price: "60.00",
    color: "Mixed",
    badge: false,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1013,
    img: newArrTwo,
    productName: "Funny toys for babies",
    price: "60.00",
    color: "Mixed",
    badge: false,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },

  {
    _id: 1014,
    img: newArrTwo,
    productName: "Smart Watch",
    price: "250.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1015,
    img: newArrFour,
    productName: "Funny toys for babies",
    price: "60.00",
    color: "Mixed",
    badge: false,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1016,
    img: newArrTwo,
    productName: "Smart Watch",
    price: "250.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1017,
    img: bestSellerFour,
    productName: "Travel Bag",
    price: "220.00",
    color: "Black",
    badge: false,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1018,
    img: newArrOne,
    productName: "Round Table Clock",
    price: "44.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1019,
    img: newArrTwo,
    productName: "Smart Watch",
    price: "250.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1020,
    img: newArrThree,
    productName: "cloth Basket",
    price: "80.00",
    color: "Mixed",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1021,
    img: spfThree,
    productName: "Headphones",
    price: "25.00",
    color: "Mixed",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1022,
    img: spfFour,
    productName: "Sun glasses",
    price: "220.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1023,
    img: bestSellerOne,
    productName: "Flower Base",
    price: "35.00",
    color: "Blank and White",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1024,
    img: spfOne,
    productName: "Cap for Boys",
    price: "35.00",
    color: "Blank and White",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1025,
    img: spfTwo,
    productName: "Tea Table",
    price: "180.00",
    color: "Gray",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1026,
    img: spfThree,
    productName: "Headphones",
    price: "25.00",
    color: "Mixed",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1027,
    img: spfFour,
    productName: "Sun glasses",
    price: "220.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1028,
    img: bestSellerOne,
    productName: "Flower Base",
    price: "35.00",
    color: "Blank and White",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1029,
    img: bestSellerTwo,
    productName: "New Backpack",
    price: "180.00",
    color: "Gray",
    badge: false,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1030,
    img: bestSellerThree,
    productName: "Household materials",
    price: "25.00",
    color: "Mixed",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1031,
    img: bestSellerFour,
    productName: "Travel Bag",
    price: "220.00",
    color: "Black",
    badge: false,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1032,
    img: newArrOne,
    productName: "Round Table Clock",
    price: "44.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1033,
    img: newArrTwo,
    productName: "Smart Watch",
    price: "250.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1034,
    img: newArrThree,
    productName: "cloth Basket",
    price: "80.00",
    color: "Mixed",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1035,
    img: newArrFour,
    productName: "Funny toys for babies",
    price: "60.00",
    color: "Mixed",
    badge: false,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1036,
    img: newArrTwo,
    productName: "Funny toys for babies",
    price: "60.00",
    color: "Mixed",
    badge: false,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1037,
    img: newArrFour,
    productName: "Funny toys for babies",
    price: "60.00",
    color: "Mixed",
    badge: false,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1038,
    img: newArrTwo,
    productName: "Smart Watch",
    price: "250.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1039,
    img: bestSellerFour,
    productName: "Travel Bag",
    price: "220.00",
    color: "Black",
    badge: false,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1040,
    img: newArrOne,
    productName: "Round Table Clock",
    price: "44.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1041,
    img: newArrTwo,
    productName: "Smart Watch",
    price: "250.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1042,
    img: newArrThree,
    productName: "cloth Basket",
    price: "80.00",
    color: "Mixed",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1043,
    img: spfThree,
    productName: "Headphones",
    price: "25.00",
    color: "Mixed",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1044,
    img: spfFour,
    productName: "Sun glasses",
    price: "220.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1045,
    img: bestSellerOne,
    productName: "Flower Base",
    price: "35.00",
    color: "Blank and White",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: 1046,
    img: spfOne,
    productName: "Cap for Boys",
    price: "35.00",
    color: "Blank and White",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
];
// =================== PaginationItems End here =================
