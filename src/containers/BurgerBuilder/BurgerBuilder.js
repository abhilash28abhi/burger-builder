//we impot React to use JSX with components
import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }

    //logic to update the inital state of ingredients from firebase
    componentDidMount() {
        // console.log(this.props);
        this.props.onInitIngredients();
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
        return ingredientSum > 0;
        
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        //logic to redirect to /checkout page with encode ingredients value
        /* const queryParams = [];
        for (let ing in this.props.ings) {
            queryParams.push(encodeURIComponent(ing) + '=' + encodeURIComponent(this.state.ingredients[ing]));
        }
        queryParams.push('price=' + this.props.price);
        const queryString = queryParams.join('&'); */
        //now using redux for getting the ings and not passing them as query param

        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render () {
        const disabledInfo = {...this.props.ings};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0 ; //will set it to either true or false
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!!</p> : <Spinner/>;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients = {this.props.ings}/>
                    <BuildControls ingredientAdded={this.props.onIngredientAdded} 
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    price={this.props.price}
                    purchaseable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchaseHandler}/>
                </Aux>);
            //logic to show spinner or order summary
            orderSummary = <OrderSummary ingredients={this.props.ings} 
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}
                    price={this.props.price}/>;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}
//map which will hold the mapping between state fields and component props
const mapStateToProps = (state) => {
    return {
        ings : state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const dispatchToProps = (dispatch) => {
    return {
        onIngredientAdded : (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved : (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients : () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase : () => dispatch(burgerBuilderActions.purchaseInit())
    }
}
export default connect(mapStateToProps, dispatchToProps) (BurgerBuilder);