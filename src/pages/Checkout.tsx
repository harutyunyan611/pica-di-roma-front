import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {IOrder} from "../types/IOrder";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import OrdersManager from "../managers/OrdersManager";
import AxiosDefaultConfig from "../managers/config/AxiosDefaultConfig";
import {UseAuthDataStateValue} from "../context/AuthContext";
import {UseGlobalShopDataStateValue} from "../context/GlobalShopContext";
import _ from "lodash";
import {useHistory} from "react-router";
import {Alert, AlertTitle} from "@material-ui/lab";
import {Backdrop, CircularProgress} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  }
}));

const steps = ['Shipping address'];

const Checkout = () => {
  const classes = useStyles();
  const history = useHistory();
  const [orderData, setOrderData] = useState<IOrder>({
    address: "",
    first_name: "",
    last_name: "",
    phone: 0,
    pizzas: {}
  });
  const [activeStep, setActiveStep] = React.useState(0);
  const {authDataState} = UseAuthDataStateValue();
  const {globalShopDataState} = UseGlobalShopDataStateValue();
  const [isErrorsAvailable, setIsErrorsAvaialable] = useState<boolean>(false);
  const [checkoutErrors, setCheckoutErrors] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleNext = async () => {
    setIsErrorsAvaialable(false);
    setIsLoading(true);
    try {
      let headers = {}
      if (authDataState.authToken) {
        headers = AxiosDefaultConfig.getBaseConfig();
      }
      const response = await OrdersManager.addOrder(orderData, headers);
      if (response.data) {
        setActiveStep(activeStep + 1);
      }
    } catch (e) {
      setIsErrorsAvaialable(true);
      setCheckoutErrors(e?.response?.data?.error)
    }
    setIsLoading(false)
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleOrderDataUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderData({...orderData, [e.target.name]: e.target.value})
  }

  useEffect(() => {
    if (!globalShopDataState.globalShopData.shopBagData.length) {
      history.push("/menu");
    } else {
      let pizzas: any = {};
      _.forEach(globalShopDataState.globalShopData.shopBagData, (pizza) => {
        pizzas[pizza.name] = pizza.count ? pizza.count : 1
      });

      setOrderData({...orderData, pizzas: pizzas})
    }
  }, []);
  return (
    <React.Fragment>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <CssBaseline/>
      {isErrorsAvailable && <Alert severity="error" className="error-bar">
        <AlertTitle>Errors</AlertTitle>
        {_.map(checkoutErrors, (error) => {
          return <span>{error}<br/></span>
        })}
      </Alert>}
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order confirmation, and will
                  send you an update when your order has shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography variant="h6" gutterBottom>
                  Shipping address
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="firstName"
                      name="first_name"
                      label="First name"
                      fullWidth
                      autoComplete="first-name"
                      onChange={handleOrderDataUpdate}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="lastName"
                      name="last_name"
                      label="Last name"
                      fullWidth
                      autoComplete="last-name"
                      onChange={handleOrderDataUpdate}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="address"
                      name="address"
                      label="Address"
                      fullWidth
                      autoComplete="shipping address-line1"
                      onChange={handleOrderDataUpdate}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="phone-number"
                      label="Phone Number"
                      type="number"
                      name="phone"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="filled"
                      onChange={handleOrderDataUpdate}
                    />
                  </Grid>
                </Grid>
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}

export default Checkout;
