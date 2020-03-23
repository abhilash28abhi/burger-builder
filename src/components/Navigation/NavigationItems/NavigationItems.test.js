import React from 'react';
import {configure , shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from '../NavigationItem/NavigationItem';

//to connect to enzyme
configure({adapter: new Adapter()});

//shallow function helps in rendering only that particular component for test
describe('<NavigationItems/>' , () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems/>);
    });

    //logic for user not authenticated
    it('should render two <NavigationItem/> elements if not authenticated',
        () => {
            expect(wrapper.find(NavigationItem))
                .toHaveLength(2);
        });

    //logic for user as authenticated   
    it('should render three <NavigationItem/> elements if user is authenticated',
        () => {
            //wrapper = shallow(<NavigationItems isAuthenticated/>);
            wrapper.setProps({isAuthenticated: true});
            expect(wrapper.find(NavigationItem))
                .toHaveLength(3);
        });

    it('should render three <NavigationItem/> elements if user is authenticated',
    () => {
        //wrapper = shallow(<NavigationItems isAuthenticated/>);
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>))
        .toEqual(true);
    });   
});