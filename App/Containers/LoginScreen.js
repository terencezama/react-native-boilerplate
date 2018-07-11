import React, { Component } from 'react'
import {
  View,
  Image,
  Keyboard
} from 'react-native';
import {
  RkButton,
  RkText,
  RkTextInput,
  RkStyleSheet,
  RkTheme,
  RkAvoidKeyboard
} from 'react-native-ui-kitten';
import Images from '../Themes/Images'
import { connect } from 'react-redux'
// import {GradientButton} from '../Components/gradientButton';
import {scale, scaleModerate, scaleVertical} from '../utils/scale';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoginScreenStyle'

class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
  }

  render() {
    let renderIcon = () => {
      // if (RkTheme.current.name === 'light')
      //   return <Image style={styles.image} source={require('../../assets/images/logo.png')}/>;
      return <Image style={styles.image} source={Images.logo}/>
    };
    return (
      <RkAvoidKeyboard
        style={styles.screen}
        onStartShouldSetResponder={ (e) => true}
        onResponderRelease={ (e) => Keyboard.dismiss()}>
        <View style={{alignItems: 'center'}}>
          {renderIcon()}
          <RkText rkType='h1'>PMS</RkText>
        </View>
        <View style={styles.content}>
          <View>
            <RkTextInput rkType='rounded' placeholder='Email'/>
            <RkTextInput rkType='rounded' placeholder='Password' secureTextEntry={true}/>

            <RkButton style={styles.save} rkType='xlarge' onPress={() => {
              this.props.navigation.goBack()
            }}>
            Login</RkButton>
          </View>
          <View style={styles.footer}>
            <View style={styles.textRow}>
              {/* <RkText rkType='primary3'>Already have an account?</RkText>
              <RkButton rkType='clear'  onPress={() => this.props.navigation.navigate('Login1')}>
                <RkText rkType='header6'> Sign in now </RkText>
              </RkButton> */}
            </View>
          </View>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
