import React,{Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';
import axios from '../../axios-orders';

class WithErrorHandler extends Component {
    state = {
        error : null
    }

    componentDidMount() {
        axios.interceptors.request.use(req => {
            this.setState({error: null});
            return req;
        });

        axios.interceptors.response.use(
            resp => resp, err => {
                this.setState({error: err.message});
            }
        );
    }

    errorConfirmedHanlder = () => {
        this.setState({error: null});
    }

    render () {
        return (
            <Aux>
                <Modal show={this.state.error} clicked={this.errorConfirmedHanlder}>
                    {this.state.error}
                </Modal>
                {this.props.children}
            </Aux>
            );
    }
}

export default WithErrorHandler;