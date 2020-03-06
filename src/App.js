import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import ErrorHandler from './hoc/ErrorHandler/ErrorHandler';
import Checkout from './containers/Checkout/Checkout';
import {Route, Switch} from 'react-router-dom';
import Orders from '../src/containers/Orders/Orders';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <ErrorHandler>
            <Switch>
              <Route path="/" exact component={BurgerBuilder}/>
              <Route path="/orders" component={Orders}/>
              <Route path="/checkout" component={Checkout}/>
            </Switch>
          </ErrorHandler>
        </Layout>
      </div>
    );
  }
}

export default App;
