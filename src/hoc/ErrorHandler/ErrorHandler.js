import React,{Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';
import axios from '../../axios-orders';

class ErrorHandler extends Component {
    state = {
        error : null
    }

    componentWillMount() {
        this.reqInterceptor = axios.interceptors.request.use(req => {
            this.setState({error: null});
            return req;
        });

        this.resInterceptor = axios.interceptors.response.use(
            resp => resp, err => {
                this.setState({error: err.message});
            }
        );
    }

    componentWillUnmount() {
        //logic to remove the interceptors
        axios.interceptors.request.eject(this.reqInterceptor);
        axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHanlder = () => {
        this.setState({error: null});
    }

    render () {
        return (
            <Aux>
                <Modal show={this.state.error} modalClosed={this.errorConfirmedHanlder}>
                    {this.state.error}
                </Modal>
                {this.props.children}
            </Aux>
            );
    }
}

export default ErrorHandler;