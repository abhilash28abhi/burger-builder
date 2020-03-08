import React , {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import {withRouter} from 'react-router-dom';
import Input from  '../../../components/UI/Input/Input';

class ContactData extends Component {

    state = {
        orderForm : {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation : {
                    required : true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation : {
                    required : true
                },
                valid: false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zipcode'
                },
                value: '',
                validation : {
                    required : true,
                    minLength: 5,
                    maxLength :5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation : {
                    required : true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation : {
                    required : true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{value:'fastest', displayValue:'Fastest'},
                              {value:'cheapest', displayValue:'Cheapest'}]
                },
                value: 'fastest',
                validation: {},
                valid:true
            }
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {
        console.log(this.props);
        //prevent default will prevent the default behavior which is to reload the page or submit the request
        event.preventDefault();
        //console.log(this.props.ingredients);
        this.setState({loading: true});
        const formData = {};
        for (let formElement in this.state.orderForm) {
            formData[formElement] = this.state.orderForm[formElement].value;
        }

        const order = {
            ingredients : this.props.ingredients,
            orderPrice : this.props.price,
            orderData : formData
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

    checkFormValidation (value, rules) {
        let isValid = true;
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkFormValidation(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let formIndentifiers in updatedOrderForm) {
            formIsValid = updatedOrderForm[formIndentifiers].valid && formIsValid;
        }
        this.setState({orderForm:updatedOrderForm, formIsValid: formIsValid});
    }

    render () {
        const formElementsArray  = [];
        for (let ele in this.state.orderForm) {
            formElementsArray.push({
                id: ele,
                config: this.state.orderForm[ele]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(ele => {
                    return <Input key={ele.id}
                            elementType={ele.config.elementType} 
                            elementConfig={ele.config.elementConfig} 
                            value={ele.config.value}
                            invalid={!ele.config.valid}
                            shouldValidate={ele.config.validation}
                            touched={ele.config.touched}
                            changed={(event) => this.inputChangeHandler(event, ele.id)}/>
                })}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
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