import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const INGREDIENT_PRICES = {
    salad: 0.5,
    meat: 1.3,
    cheese: 0.4,
    bacon: 0.7
}

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

//just for refactoring
const addIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName] : state.ingredients[action.ingredientName] + 1};
        const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
        const updatedState = {
            ingredients: updatedIngredients,
            totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
            building: true
        }
        return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    const updatedIng = {[action.ingredientName] : state.ingredients[action.ingredientName] - 1};
    const updatedIngs = updateObject(state.ingredients, updatedIng);
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice : state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedSt);
}

const setIngredient = (state, action) => {
    return updateObject(state, {
        ingredients : {
            salad : action.ingredients.salad,
            meat : action.ingredients.meat,
            bacon : action.ingredients.bacon,
            cheese :action.ingredients.cheese
        },
        totalPrice: 4,
        error: false,
        building: false
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
           /* return {
            ...state,
            ingredients : {
                ...state.ingredients,
                [action.ingredientName] : state.ingredients[action.ingredientName] + 1
            },
            totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
        }; */
        case actionTypes.REMOVE_INGREDIENT : return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENT : return setIngredient(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED : return updateObject(state, {error: true});
        default : 
            return state;
    }
}

export default reducer;
