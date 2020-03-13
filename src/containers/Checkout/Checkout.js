import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';
import {Route} from 'react-router-dom';
import { connect} from 'react-redux'

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render () {
        return (
            <div>
                <CheckoutSummary ingredients={this.props.ings}
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler}/>
                <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
                {/* <Route path={this.props.match.path + '/contact-data'} render={() => (<ContactData 
                    ingredients={this.props.ings}
                    price={this.props.price}/>)}/> */}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings : state.ingredients,
    }
}

export default connect(mapStateToProps) (Checkout);