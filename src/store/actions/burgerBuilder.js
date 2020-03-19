import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingName) => {
    return {
        type : actionTypes.ADD_INGREDIENT,
        ingredientName : ingName
    }
}

export const removeIngredient = (ingName) => {
    return {
        type : actionTypes.REMOVE_INGREDIENT,
        ingredientName : ingName
    }
}

export const setIngredients = (ing) => {
    return {
        type : actionTypes.SET_INGREDIENT,
        ingredients : ing
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type : actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    //thunk will provide the dispatch
    return dispatch => {
        axios.get('https://react-my-burger-5d37d.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data));
            })
            .catch(err => {
                dispatch(fetchIngredientsFailed());
            });
    };
}