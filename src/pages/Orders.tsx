import React, {useEffect, useState} from 'react';
import {Backdrop, CircularProgress, Grid} from '@material-ui/core';
import OrdersManager from "../managers/OrdersManager";
import { IOrder } from '../types/IOrder';
import _ from "lodash";
import Order from "../components/Order";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));


const Orders = () => {
  const classes = useStyles();

  const [orders, setOrders] = useState<Array<IOrder>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getOrders = async () => {
    setIsLoading(true);
    try {
      const response = await OrdersManager.getOrders();
      setOrders(response.data.data)
    } catch (e) {
      throw e;
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="orders">
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {orders.length ? <Grid container spacing={1}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={3}>
            {_.map(orders, (order: any) => {
              return <Order data={order}/>
            })}
          </Grid>
        </Grid>
      </Grid> : <Typography component="h1" className="empty-title" variant="h5">
        You have no orders yet
      </Typography>}
    </div>
  );
}

export default Orders;
