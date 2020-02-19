//we impot React to use JSX with components
import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    meat: 1.3,
    cheese: 0.4,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    //object with ingredient and their counts
    state = {
        ingredients : {
            'bacon' : 0,
            'salad' : 0,
            'cheese': 0,
            'meat'  : 0
        },
        totalPrice: 4
    }

    addIngredientHandler = (type) => {
        //logic to update the item count for each ingredient
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngeredients = {
            ...this.state.ingredients
        };
        updatedIngeredients[type] = updatedCount;
        
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients : updatedIngeredients
        });
    };

    removeIngredientHandler = (type) => {
        //logic to update the item count for each ingredient
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngeredients = {
            ...this.state.ingredients
        };
        updatedIngeredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            totalPrice: newPrice,
            ingredients : updatedIngeredients
        });
    };

    render () {
        const disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0 ; //will set it to either true or false
        }

        return (
            <Aux>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls ingredientAdded={this.addIngredientHandler} 
                 ingredientRemoved={this.removeIngredientHandler}
                 disabled={disabledInfo}
                 price={this.state.totalPrice}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;