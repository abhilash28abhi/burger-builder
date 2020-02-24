import React,{Component} from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

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
            <Toolbar drawerToggleClicked={this.sideDrawerToggleHanlder}/>
            <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHanlder}/>
            <main className = {classes.Content}>
                {this.props.children}
            </main>
        </Aux>);
    }
};

export default Layout;