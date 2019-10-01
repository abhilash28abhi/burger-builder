# burger-builder

A React based burger-builder app based on the Udemy course!!

Steps:
1.  sudo create-react-app -g : To give global permission to create react app command
2.  create-react-app <app-name> —scripts-version 1.1.5 : To create the react app
3.  npm run eject : To create css modules for the components
4.  Add these properties in webpack config for dev and production for dynamic creation of class names under options property:
                  modules : true ,
                  localIdentName: '[name]__[local]__[hash:base64:5]'
