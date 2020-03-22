import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import ErrorHandler from './hoc/ErrorHandler/ErrorHandler';
import Checkout from './containers/Checkout/Checkout';
import {Route, Switch, withRouter} from 'react-router-dom';
import Orders from '../src/containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  render() {
    return (
      <div>
        <Layout>
          <ErrorHandler>
            <Switch>
              <Route path="/" exact component={BurgerBuilder}/>
              <Route path="/orders" component={Orders}/>
              <Route path="/checkout" component={Checkout}/>
              <Route path="/auth" component={Auth}/>
              <Route path="/logout" component={Logout}/>
            </Switch>
          </ErrorHandler>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp : () => dispatch(actions.authCheckState())
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated : state.auth.token !== null
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
