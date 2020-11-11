import React from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Paper, ButtonBase, Grid, Typography} from '@material-ui/core';
import _ from "lodash";
import {Currencies, UseGlobalShopDataStateValue} from "../context/GlobalShopContext";
import {EuroCost} from "../types/EuroCost";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }),
);


interface IOrderProps {
  data: {
    id: number,
    address: string,
    created_at: string,
    first_name: string
    last_name: "Antonyan"
    phone: "41403323",
    total: number,
    pizzas: any,
  }
}

const Order = (props: IOrderProps) => {
  const classes = useStyles();
  const {globalShopDataState} = UseGlobalShopDataStateValue();

  const checkPrice = () => {
    if(globalShopDataState.globalShopData.currency === Currencies.dollar){
      return props.data.total;
    } else {
      return Math.floor(props.data.total * EuroCost.cost);
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
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            {_.map(props.data.pizzas, (pizza) => {
              return <>
                <p>{pizza.name} - {pizza.pivot.count}</p>
              </>
            })}
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {props.data.first_name} {props.data.last_name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {props.data.address} <br/> {props.data.created_at}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ID: {props.data.id}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{checkPrice()} {checkCurrency()}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default Order;
