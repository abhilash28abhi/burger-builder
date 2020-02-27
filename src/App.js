import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import WithErrorHandler from './hoc/WithErrorHandler/WithErrorHandler';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <WithErrorHandler>
            <BurgerBuilder/>
          </WithErrorHandler>
        </Layout>
      </div>
    );
  }
}

export default App;
