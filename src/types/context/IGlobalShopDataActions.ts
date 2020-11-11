import {IPizza} from "../IPizza";
import {Currencies} from "../../context/GlobalShopContext";

export type IGlobalShopDataActions =
  | {
  type: 'UPDATE_IS_SHOP_CARD_OPENED';
  status: boolean;
}
  | {
  type: 'ADD_ITEM_IN_SHOP_BAG';
  item: IPizza;
}
  | {
  type: 'REMOVE_ITEM_FROM_SHOP_BAG';
  itemId: number;
}
  | {
  type: 'COUNT_TOTAL_PRICE';
}
  | {
  type: 'ITEM_TOTAL_COUNT';
}
  | {
  type: 'UPDATE_CURRENCY';
  currency: Currencies
}
