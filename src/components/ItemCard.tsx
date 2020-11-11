import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import DescriptionIcon from '@material-ui/icons/Description';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import CloseIcon from '@material-ui/icons/Close';
import {IPizza} from "../types/IPizza";
import {Currencies, UseGlobalShopDataStateValue} from "../context/GlobalShopContext";
import {GlobalShopDataStaticData} from "../static/GlobalShopDataStaticData";
import {EuroCost} from "../types/EuroCost";
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
      minWidth: 345
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
);

interface IItemCardProps {
  data: IPizza
  type: ItemCardTypes
}

export enum ItemCardTypes {
  menu = "menu",
  order = "order"
}

const ItemCard = (props: IItemCardProps) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const {globalShopDataState, setGlobalShopDataState} = UseGlobalShopDataStateValue();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleBagIconClick = () => {
    setGlobalShopDataState({type: GlobalShopDataStaticData.UPDATE_IS_SHOP_CARD_OPENED, status: true})
  }


  const handleAddItemClick = () => {
    setGlobalShopDataState({type: GlobalShopDataStaticData.ADD_ITEM_IN_SHOP_BAG, item: props.data})
    setGlobalShopDataState({type: GlobalShopDataStaticData.COUNT_TOTAL_PRICE})
    setGlobalShopDataState({type: GlobalShopDataStaticData.ITEM_TOTAL_COUNT})
    handleBagIconClick();
  }

  const handleItemDeleteClick = (id: number) => {
    setGlobalShopDataState({type: GlobalShopDataStaticData.REMOVE_ITEM_FROM_SHOP_BAG, itemId: id})
    setGlobalShopDataState({type: GlobalShopDataStaticData.COUNT_TOTAL_PRICE})
    setGlobalShopDataState({type: GlobalShopDataStaticData.ITEM_TOTAL_COUNT})
  };

  const checkPrice = () => {
    if (props.type === ItemCardTypes.order && props.data.count) {
      if (globalShopDataState.globalShopData.currency === Currencies.dollar) {
        return props.data.count * props.data.price;
      } else {
        return Math.floor((props.data.count * props.data.price) * EuroCost.cost);
      }
    } else {
      if (globalShopDataState.globalShopData.currency === Currencies.dollar) {
        return props.data?.price;
      } else {
        return Math.floor(props.data?.price * EuroCost.cost)
      }
    }
  }

  const checkCurrency = () => {
    if (globalShopDataState.globalShopData.currency === Currencies.dollar) {
      return "$";
    } else {
      return "€"
    }
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          props.type === ItemCardTypes.menu ? <IconButton aria-label="settings" onClick={handleAddItemClick}>
            <AddShoppingCartIcon/>
          </IconButton> : <IconButton aria-label="settings" onClick={() => handleItemDeleteClick(props.data.id)}>
            <CloseIcon/>
          </IconButton>
        }
        title={`${props.data?.name} ${props.type === ItemCardTypes.order ? '- ' + props.data.count : ''}`}
        subheader={`${checkPrice()} ${checkCurrency()}`}
      />
      <CardMedia
        className={classes.media}
        image={`${props.data?.image}`}
        title={props.data?.name}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.data?.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <DescriptionIcon/>
        </IconButton>
        {props.type === ItemCardTypes.order && <IconButton
          onClick={handleAddItemClick}
        >
          <AddIcon/>
        </IconButton>}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Description:</Typography>
          <Typography paragraph>
            {props.data?.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default ItemCard;
