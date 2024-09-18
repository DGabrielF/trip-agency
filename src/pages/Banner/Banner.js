import { ToolsHTML } from "../../scripts/tools/ToolsHTML.js"
import { Carousel } from "../../components/Base/Carousel/Carousel.js";
import { data } from "../../scripts/data.js";

export const Banner = {
  create: () => {},
}

Banner.create = () => {
  const element = ToolsHTML.createElementWithClass("div", "banner");
  
  const carousel = createCarousel(data.pages.banner.images);
  element.appendChild(carousel.create())
  
  return element;
}

function createImageElementArray (images) {
  const imageElementArray = [];

  images.forEach(element => {
    const image = ToolsHTML.createElementWithClass("img", "banner_image");
    image.src = element.src ? element.src : element;
    image.alt = element.alt ? element.alt : element;
    imageElementArray.push(image);
  });

  return imageElementArray;
}

function createCarousel(images) {
  const elementArray = createImageElementArray(images);
  const carouselParams = {
    objectArray: elementArray,
    itemPresentationTime: 5000,
    numberOfItemsToShow: 1,
  };
  const carousel = new Carousel (carouselParams)
  return carousel
}