import React from 'react';
import {Redirect, Route} from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Orders from "../pages/Orders";
import Checkout from "../pages/Checkout";
import {UseAuthDataStateValue} from "../context/AuthContext";
import Bag from "../pages/Bag";

const MainRouter = () => {
  const {authDataState} = UseAuthDataStateValue();
  return (
    <>
      <Route path="/" exact children={<Redirect to={"/menu"}/>}/>
      <Route path="/menu" exact component={Home}/>
      {!authDataState.authToken && <Route path="/signIn" exact component={SignIn}/>}
      {!authDataState.authToken && <Route path="/signUp" exact component={SignUp}/>}
      {authDataState.authToken && <Route path="/orders" exact component={Orders}/>}
      <Route path="/checkout" exact component={Checkout}/>
      <Route path="/bag" exact component={Bag}/>
    </>
  );
}

export default MainRouter;
