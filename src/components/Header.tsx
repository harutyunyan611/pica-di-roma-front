import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LocalPizzaIcon from '@material-ui/icons/LocalPizza';
import {Link, useHistory} from 'react-router-dom';
import {UseAuthDataStateValue} from "../context/AuthContext";
import {Badge, Button, FormControl, RadioGroup, FormControlLabel, Radio} from "@material-ui/core";
import {AuthContextDataStaticData} from "../static/AuthContextDataStaticData";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Currencies, UseGlobalShopDataStateValue} from "../context/GlobalShopContext";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import {GlobalShopDataStaticData} from "../static/GlobalShopDataStaticData";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      cursor: "pointer"
    },
    appBar: {
      backgroundColor: "#2c3e50"
    },
    signOutButton: {
      margin: "0 8px"
    },
    checkedIcon: {
      fill: "#fff"
    },
    currenciesWrapper: {
      display: "inline-block"
    }
  }),
);

const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  const {authDataState, setAuthDataState} = UseAuthDataStateValue();
  const {globalShopDataState, setGlobalShopDataState} = UseGlobalShopDataStateValue();


  const handleHomeRedirect = () => {
    history.push("");
  };

  const handleSignOutClick = () => {
    setAuthDataState({type: AuthContextDataStaticData.UPDATE_AUTH_TOKEN, token: ''});
  };

  const [currency, setCurrency] = React.useState('dollar');

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(e.target.value);
    setGlobalShopDataState({type: GlobalShopDataStaticData.UPDATE_CURRENCY, currency: e.target.value as Currencies})
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title} onClick={handleHomeRedirect}>
            Pizza Di Roma <LocalPizzaIcon/>
          </Typography>
          <div className="nav-items">
            <FormControl component="fieldset">
              <RadioGroup aria-label="currency" className={classes.currenciesWrapper} name="currency" value={currency} onChange={handleCurrencyChange}>
                <FormControlLabel value="dollar" control={<Radio icon={<AttachMoneyIcon/>} checkedIcon={<AttachMoneyIcon className={classes.checkedIcon}/>} />} label="Dollar" />
                <FormControlLabel value="euro" control={<Radio icon={<EuroSymbolIcon/>} checkedIcon={<EuroSymbolIcon className={classes.checkedIcon}/>} />} label="Euro" />
              </RadioGroup>
            </FormControl>
            <Link to={"/bag"}>
              <Badge badgeContent={globalShopDataState.globalShopData.shopBagItemsCount} color="primary">
                <ShoppingCartIcon/>
              </Badge>
            </Link>
            <Link to={"/menu"}>Menu</Link>
            {authDataState.authToken && <Link to={"/orders"}>Orders</Link>}
            {!authDataState.authToken ? <> <Link to={"/signIn"}>Sign In</Link> <Link to={"/signUp"}>Sign Up</Link> </> :
              <Button onClick={handleSignOutClick} className={classes.signOutButton} variant="contained" color="primary">
                Sign Out
              </Button>}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}


export default Header;
