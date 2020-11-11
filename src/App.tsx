import React from 'react';
import {
  BrowserRouter as Router, Redirect, Route,
} from 'react-router-dom';
import {GlobalShopDataContextProvider} from './context/GlobalShopContext';
import Header from "./components/Header";
import { AuthContextProvider } from './context/AuthContext';
import MainRouter from "./components/MainRouter";

const App = () => {
  return (
    <AuthContextProvider>
      <GlobalShopDataContextProvider>
        <div className="App">
          <Router>
            <Header/>
            <MainRouter/>
          </Router>
        </div>
      </GlobalShopDataContextProvider>
    </AuthContextProvider>
  );
}

export default App;
