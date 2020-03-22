import React,{Component} from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

class Layout extends Component {
    state = {
        showSideDrawer : false
    }

    sideDrawerCloseHanlder = () => {
        this.setState({showSideDrawer : false});
    }

    sideDrawerToggleHanlder = () => {
        const showSideDrawer = this.state.showSideDrawer;
        this.setState({showSideDrawer: !showSideDrawer});
    }

    render () {
        return (<Aux>
            <Toolbar isAuth={this.props.isAuthenticated}
                drawerToggleClicked={this.sideDrawerToggleHanlder}/>
            <SideDrawer isAuth={this.props.isAuthenticated}
            open={this.state.showSideDrawer} closed={this.sideDrawerCloseHanlder}/>
            <main className = {classes.Content}>
                {this.props.children}
            </main>
        </Aux>);
    }
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated : state.auth.token !== null
    }
}

export default connect(mapStateToProps) (Layout);