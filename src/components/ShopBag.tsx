import React from 'react';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import {Currencies, UseGlobalShopDataStateValue} from "../context/GlobalShopContext";
import {GlobalShopDataStaticData} from "../static/GlobalShopDataStaticData";
import {Button} from "@material-ui/core";
import _ from "lodash";
import {IPizza} from "../types/IPizza";
import CloseIcon from '@material-ui/icons/Close';
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import {useHistory} from "react-router";
import {EuroCost} from "../types/EuroCost";

const ShopBag = () => {
  const {globalShopDataState, setGlobalShopDataState} = UseGlobalShopDataStateValue();
  const history = useHistory();

  const handleBagIconClick = () => {
    setGlobalShopDataState({type: GlobalShopDataStaticData.UPDATE_IS_SHOP_CARD_OPENED, status: !globalShopDataState.globalShopData.isShopCardOpened})
  }

  const handleItemDeleteClick = (id: number) => {
    setGlobalShopDataState({type: GlobalShopDataStaticData.REMOVE_ITEM_FROM_SHOP_BAG, itemId: id})
    setGlobalShopDataState({type: GlobalShopDataStaticData.COUNT_TOTAL_PRICE})
    setGlobalShopDataState({type: GlobalShopDataStaticData.ITEM_TOTAL_COUNT})
  };

  const handleSubmitOrderClick = () => {
    history.push("/checkout")
  }

  const checkPrice = (price: number) => {
    if(globalShopDataState.globalShopData.currency === Currencies.dollar){
      return price;
    } else {
      return Math.floor(price * EuroCost.cost);
    }
  }

  const checkCurrency = () => {
    if(globalShopDataState.globalShopData.currency === Currencies.dollar){
      return "$";
    } else {
      return "€";
    }
  }
  return (
    <div className={`${globalShopDataState.globalShopData.isShopCardOpened ? 'shop-bag__container_opened' : ''} shop-bag__container`}>
      <div className="shop-bag">
        { globalShopDataState.globalShopData.shopBagData.length ? _.map(globalShopDataState.globalShopData.shopBagData, (pizza: IPizza) => {
          return <div className="shop-bag__pizzas">
            <div className="item__remove-icon">
              <IconButton aria-label="close" onClick={() => handleItemDeleteClick(pizza.id)}>
                <CloseIcon/>
              </IconButton>
            </div>
            <img src={`${pizza.image}`} width={160} alt={pizza.name}/>
            <div className='shop-bag__description'>
              <span className="shop-bag__description_title">{pizza.name}</span>
              <span className="shop-bag__description_text">{pizza.description}</span>
              <span className="shop-bag__description_price">Price: {pizza.count ? pizza.count * checkPrice(pizza.price) : checkPrice(pizza.price)} {checkCurrency()}</span>
              {pizza.count && <span className="shop-bag__description_price">Count: {pizza.count}</span>}
            </div>
          </div>
        }) : <Typography paragraph>No Pizzas Added To Bag</Typography>}
        {globalShopDataState.globalShopData.shopBagData.length ? <Typography paragraph>Total: {checkPrice(globalShopDataState.globalShopData.shopBagTotal)} {checkCurrency()} / With Delivery Cost</Typography> : ''}
        {globalShopDataState.globalShopData.shopBagData.length ? <Button onClick={handleSubmitOrderClick} variant="contained" className="order-button" color="primary">
          Submit Order
        </Button> : ''}
        <div className="shop-bag__open-icon" onClick={handleBagIconClick}>
          <KeyboardArrowRightIcon className={`${globalShopDataState.globalShopData.isShopCardOpened ? 'bag-icon_opened' : ''} bag-icon`}/>
        </div>
      </div>
    </div>
  );
}

export default ShopBag;
