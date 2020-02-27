//we impot React to use JSX with components
import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

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
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false
    }

    updatePurchaseState (ingredients) {
        //logic to calculate the sum of all ingredients
        const ingredientSum = Object.keys(ingredients)
                                .map(igKey => {
                                    return ingredients[igKey]
                                })
                                .reduce((sum, el) => {
                                    return sum + el;
                                },0);
        this.setState({
            purchaseable : ingredientSum > 0
        });
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

        this.updatePurchaseState(updatedIngeredients);
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
        this.updatePurchaseState(updatedIngeredients);
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.setState({loading: true});
        const order = {
            ingredients : this.state.ingredients,
            orderPrice : this.state.totalPrice,
            customer : {
                name: 'Abhilash',
                address : {
                    street: 'Test add',
                    zipcode: '74003',
                    country: 'India'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'Super quick'
        };

        //only for firebase add .json
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false, purchasing: false});
            })
            .catch(error => {
                this.setState({loading: false, purchasing: false});
            });
    }

    render () {
        const disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0 ; //will set it to either true or false
        }
        //logic to show spinner or order summary
        let orderSummary = <OrderSummary ingredients={this.state.ingredients} 
                                purchaseCancelled={this.purchaseCancelHandler}
                                purchaseContinue={this.purchaseContinueHandler}
                                price={this.state.totalPrice}/>;
        if(this.state.loading){
            orderSummary = <Spinner/>
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls ingredientAdded={this.addIngredientHandler} 
                 ingredientRemoved={this.removeIngredientHandler}
                 disabled={disabledInfo}
                 price={this.state.totalPrice}
                 purchaseable={this.state.purchaseable}
                 ordered={this.purchaseHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;