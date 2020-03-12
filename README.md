# burger-builder

A React based burger-builder app based on the Udemy course!!

Steps:
1.  sudo create-react-app -g : To give global permission to create react app command
2.  create-react-app <app-name> --scripts-version 1.1.5 : To create the react app
3.  npm run eject : To create css modules for the components
4.  Add these properties in webpack config for dev and production for dynamic creation of class names under options property:
                  ```modules : true ```
                  ```localIdentName: [name]__[local]__[hash:base64:5]```
5.  To use propTypes we need to install the proptypes package using below command:
        npm install --save prop-types; the --save will save the package entry in package.json file
6.  Use Aux for MAC and Auxiliary for windows.
7.  If you are using {} braces as function body while writing the component, then you must use return statement to return the JSX body, else use () only without the need of return statement.
8.  With media queries we can override the base css style for an element. In short to achieve responsiveness.
9.  Use axios NPM package to make HTTP calls:
    npm install axios
10. For Routing use below npm package:
    npm install react-router-dom
11. For Redux use:
    npm install redux react-redux packages
