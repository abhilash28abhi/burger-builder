import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import ErrorHandler from './hoc/ErrorHandler/ErrorHandler';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <ErrorHandler>
            <BurgerBuilder/>
          </ErrorHandler>
        </Layout>
      </div>
    );
  }
}

export default App;
