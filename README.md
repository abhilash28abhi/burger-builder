# burger-builder

A React based burger-builder app based on the Udemy course!!

Steps:
1.  To give global permission to create react app command:</br>
    `sudo create-react-app -g`
2.  create-react-app <app-name> --scripts-version 1.1.5 : To create the react app
3.  To create css modules for the components:</br>
    `npm run eject`
4.  Add these properties in webpack config for dev and production for dynamic creation of class names under options property:</br>
         `modules : true `</br>
`localIdentName: [name]__[local]__[hash:base64:5]`
5.  To use propTypes we need to install the proptypes package using below command:</br>
    `npm install prop-types`
6.  Use Aux for MAC and Auxiliary for windows.
7.  If you are using {} braces as function body while writing the component, then you must use return statement to return the JSX body, else use () only without the need of return statement.
8.  With media queries we can override the base css style for an element. In short to achieve responsiveness.
9.  Use axios NPM package to make HTTP calls:</br>
    `npm install axios`
10. For Routing use below npm package:</br>
    `npm install react-router-dom`
11. For Redux use:</br>
    `npm install redux react-redux packages`
12. To use redux thunk as a middleware for dispatching action creators to use async code:</br>
    `npm install redux-thunk`
13. This application uses firebase for authentication and for as a storage medium without which this app will break.
14. For writing test cases install the below npm packages, the test file should have .test.js extension:</br>
    `npm install enzyme react-test-renderer enzyme-adapter-react-16`
