import React, { Component } from 'react'
import {
  FlatList,
  Image,
  View,
  TouchableOpacity
} from 'react-native';
import {
  RkText,
  RkCard, RkStyleSheet
} from 'react-native-ui-kitten';
import { connect } from 'react-redux'

import ProductActions from '../Redux/ProductsRedux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ProductsListScreenStyle'

class ProductsListScreen extends Component {

  static navigationOptions = {
    title: 'Article List'.toUpperCase()
  };

  constructor(props) {
    super(props);
    this.data = [{
      'id': 7,
      'photo': "",
      'type': 'fact',
      'time': -5665,
      'header': 'Smile and Frown',
      'text': 'It takes 17 muscles to smile and 43 to frown.',
      'comments': []
    }];

  }

  _keyExtractor(post) {
    return post.id;
  }

  _renderItem = (info) => {
    return (
      <TouchableOpacity
        delayPressIn={70}
        activeOpacity={0.8}
        onPress={() => this.props.navigation.navigate('Article', { id: info.item.id })}>
        <RkCard rkType='horizontal' style={styles.card}>
          <Image rkCardImg source={info.item.photo} />

          <View rkCardContent>
            <RkText numberOfLines={1} rkType='header6'>{"header"}</RkText>
            <RkText rkType='secondary6 hintColor'>{`second`}</RkText>
            <RkText style={styles.post} numberOfLines={2} rkType='secondary1'>{'tertiary'}</RkText>
          </View>
        </RkCard>
      </TouchableOpacity>
    )
  }

  componentDidMount(){
    this.props.fetchProducts()
  }

  render() {
    console.log("listing products",this.props.products)
    return (
      <View>
        <FlatList
          data={this.data}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          style={styles.container} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // props:
    products:state.products
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => dispatch(ProductActions.productsRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsListScreen)
