//we impot React to use JSX with components
import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

class BurgerBuilder extends Component {
    //object with ingredient and their counts
    state = {
        ingredients : {
            'bacon' : 1,
            'salad' : 1,
            'cheese': 1,
            'meat'  : 1
        }
    }

    render () {
        return (
            <Aux>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls/>
            </Aux>
        );
    }
}

export default BurgerBuilder;