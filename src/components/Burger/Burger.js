import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients) //returns an array of keys
                .map (ingKey => {
                    return [...Array(props.ingredients[ingKey])] //creating a new array of size equal to the value
                    .map((_,index) => {
                        return <BurgerIngredient key={ingKey+index} type={ingKey}/>
                    });
                }).reduce((preVal, el) => {
                    return preVal.concat(el)
                }, []);
    //the reduce method is similar to flatMap method in lambda            
    //console.log(transformedIngredients);

    if (transformedIngredients.length === 0 )
        transformedIngredients = <p>Please start adding ingredients</p>
    return (
        <div className = {classes.Burger}>
            <BurgerIngredient type='bread-top'/>
                {transformedIngredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    );
}

export default Burger;