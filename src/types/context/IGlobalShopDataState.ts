import {IPizza} from "../IPizza";
import {Currencies} from "../../context/GlobalShopContext";

export interface IGlobalShopDataState {
  globalShopData: {
    isShopCardOpened: boolean
    shopBagData: Array<IPizza>,
    shopBagTotal: number,
    shopBagItemsCount: number,
    currency: Currencies,
  }
}
