import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Meat', type: 'meat'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'}
];

const buildControls = (props) => {

    return <div className={classes.BuildControls}>
        <p>Current Price is : <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(cntrl => {
            return <BuildControl key={cntrl.label} ingredientlabel={cntrl.label} 
            added={() => {props.ingredientAdded(cntrl.type)}} 
            removed={()=>{props.ingredientRemoved(cntrl.type)}}
            disable={props.disabled[cntrl.type]}/>
        })}
    </div>
};

export default buildControls;