import React from 'react';
import {UseGlobalShopDataStateValue} from "../context/GlobalShopContext";
import Typography from "@material-ui/core/Typography";
import {Button, Container, Grid} from "@material-ui/core";
import {IPizza} from "../types/IPizza";
import ItemCard, {ItemCardTypes} from "../components/ItemCard";
import {useHistory} from "react-router";

const Bag = () => {
  const {globalShopDataState} = UseGlobalShopDataStateValue();
  const history = useHistory();

  const handleSubmitOrderClick = () => {
    history.push("/checkout")
  }
  return (

    <div className="bag-wrapper">
      {globalShopDataState.globalShopData.shopBagData.length ? <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              {globalShopDataState.globalShopData.shopBagData.map((pizza: IPizza) => (
                <Grid key={pizza.id} item>
                  <ItemCard data={pizza} type={ItemCardTypes.order}/>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Button onClick={handleSubmitOrderClick} variant="contained" className="order-button" color="primary">
            Submit Order
          </Button>
        </Grid>

      </Container> : <Typography component="h1" className="empty-title" variant="h5">
        You have no items added to bag
      </Typography>}
    </div>
  );
}

export default Bag;
