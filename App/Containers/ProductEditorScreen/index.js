import React, { Component } from 'react'
import {
  Keyboard
} from 'react-native';
import {
  RkAvoidKeyboard
} from 'react-native-ui-kitten';
import { connect } from 'react-redux'
import styles from './styles.js'
import ProductForm from '../../Components/Forms/ProductForm'

class ProductEditorScreen extends Component {
  static navigationOptions = {
    header: "Edit Product"
  };

  constructor(props) {
    super(props);
  }

  _onSubmit = (data) => {
    console.log(data);

  }
  
  render() {
    return (
      <RkAvoidKeyboard
        style={styles.screen}
        onStartShouldSetResponder={ (e) => true}
        onResponderRelease={ (e) => Keyboard.dismiss()}>
        {/* screen components goes here */}
        <ProductForm onSubmit={this._onSubmit} />
      </RkAvoidKeyboard>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductEditorScreen)
