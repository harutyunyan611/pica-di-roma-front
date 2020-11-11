import {IGlobalShopDataState} from "../types/context/IGlobalShopDataState";
import {IGlobalShopDataActions} from "../types/context/IGlobalShopDataActions";
import {GlobalShopDataStaticData} from "../static/GlobalShopDataStaticData";
import _ from "lodash";
import {IPizza} from "../types/IPizza";

export const GlobalShopContextReducer = (state: IGlobalShopDataState, action: IGlobalShopDataActions) => {
  switch (action.type) {
    case GlobalShopDataStaticData.UPDATE_IS_SHOP_CARD_OPENED:
      return {
        ...state,
        globalShopData: {
          ...state.globalShopData, isShopCardOpened: action.status
        }
      };
    case GlobalShopDataStaticData.ADD_ITEM_IN_SHOP_BAG:
      if (_.some(state.globalShopData.shopBagData, {id: action.item.id})) {
        const availableItem = _.find(state.globalShopData.shopBagData, {id: action.item.id});
        if (availableItem) {
          if (availableItem.count) {
            availableItem.count += 1
          } else {
            availableItem.count = 2;
          }

          return {
            ...state,
            globalShopData: {
              ...state.globalShopData,
              shopBagData: _.map(state.globalShopData.shopBagData, (item: IPizza, index: number) => {
                return item.id === availableItem.id ? availableItem : state.globalShopData.shopBagData?.[index]
              })
            }
          };
        }
      }
      return {
        ...state,
        globalShopData: {
          ...state.globalShopData, shopBagData: [...state.globalShopData.shopBagData, action.item]
        }
      };
    case GlobalShopDataStaticData.REMOVE_ITEM_FROM_SHOP_BAG:
      const deletableItem: any = _.find(state.globalShopData.shopBagData, {id: action.itemId});
      if (deletableItem && deletableItem.count) {
        if (deletableItem.count > 1) {
          deletableItem.count -= 1
          return {
            ...state,
            globalShopData: {
              ...state.globalShopData,
              shopBagData: _.map(state.globalShopData.shopBagData, (item: IPizza, index: number) => {
                return item.id === deletableItem.id ? deletableItem : state.globalShopData.shopBagData?.[index]
              })
            }
          };
        }
      }
      return {
        ...state,
        globalShopData: {
          ...state.globalShopData, shopBagData: _.filter(state.globalShopData.shopBagData, (item) => {
            return item.id !== action.itemId
          })
        }
      };
    case GlobalShopDataStaticData.COUNT_TOTAL_PRICE:
      let count = 150;
      _.forEach(state.globalShopData.shopBagData, (item) => {
        if (item.count) {
          count += item.price * item.count
        } else {
          count += item.price;
        }
      });

      return {
        ...state,
        globalShopData: {
          ...state.globalShopData, shopBagTotal: count
        }
      };
    case GlobalShopDataStaticData.ITEM_TOTAL_COUNT:
      let itemsCount = 0;
      _.forEach(state.globalShopData.shopBagData, (item) => {
        if (item.count) {
          itemsCount += item.count
        } else {
          itemsCount++;
        }
      });

      return {
        ...state,
        globalShopData: {
          ...state.globalShopData, shopBagItemsCount: itemsCount
        }
      };
    case GlobalShopDataStaticData.UPDATE_CURRENCY:
      return {
        ...state,
        globalShopData: {
          ...state.globalShopData, currency: action.currency
        }
      };
    default:
      return state;
  }
};
