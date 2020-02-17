//we impot React to use JSX with components
import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
    //object with ingredient and their counts
    state = {
        ingredients : {
            'bacon' : 0,
            'salad' : 0,
            'cheese' : 0,
            'meat' : 0
        }
    }

    render () {
        return (
            <Aux>
                <Burger ingredients = {this.state.ingredients}/>
                <div>Build Controls</div>
            </Aux>
        );
    }
}

export default BurgerBuilder;