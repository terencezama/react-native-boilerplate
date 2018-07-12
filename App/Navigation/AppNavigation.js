import { StackNavigator } from 'react-navigation'
import ProductEditorScreen from '../Containers/ProductEditorScreen'
import LoginScreen from '../Containers/LoginScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import ProductsListScreen from '../Containers/ProductsListScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  ProductEditorScreen: { screen: ProductEditorScreen },
  LoginScreen: { screen: LoginScreen },
  ProductsListScreen: { screen: ProductsListScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'ProductEditorScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
