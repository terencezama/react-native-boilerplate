import { StackNavigator } from 'react-navigation'
import {
  ProductsListScreen
} from '../Containers'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  ProductsListScreen: { screen: ProductsListScreen },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'ProductsListScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
