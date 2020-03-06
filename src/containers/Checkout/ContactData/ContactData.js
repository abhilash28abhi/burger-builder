import React , {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import {withRouter} from 'react-router-dom';

class ContactData extends Component {

    state = {
        name:'',
        email:'',
        address: {
            street:'',
            postalCode : ''
        },
        loading: false
    }

    orderHandler = (event) => {
        console.log(this.props);
        //prevent default will prevent the default behavior which is to reload the page or submit the request
        event.preventDefault();
        //console.log(this.props.ingredients);

        this.setState({loading: true});
        const order = {
            ingredients : this.props.ingredients,
            orderPrice : this.props.price,
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
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
            });
    }

    render () {
        let form = (<form>
            <input className={classes.Input} type="text" name="name" placeholder="Your name"/>
            <input className={classes.Input} type="email" name="email" placeholder="Your email"/>
            <input className={classes.Input} type="text" name="street" placeholder="Your street"/>
            <input className={classes.Input} type="text" name="postal" placeholder="Your zip code"/>
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>);
        if (this.state.loading) {
            form = <Spinner/>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your contact data</h4>
                {form}
            </div>
        );
    }
}

export default withRouter(ContactData);