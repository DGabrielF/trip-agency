import { Menu } from "../../components/Base/Menu/Menu.js"
import { data } from "../../scripts/data.js";

export const TopMenu = {
  create: () => {},
}

TopMenu.create = () => {
  const menuParams = {
    items: data.pages.menu.items,
  };
  
  const menu = new Menu(menuParams);

  return menu.create();
}