/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { NavigationContainer } from '@react-navigation/native'
import React, { Component } from 'react';
import ImageCalculator from './assets/imgs/calculator.png'
import { createStackNavigator } from '@react-navigation/stack'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Button from './src/components/Button'
import Display from './src/components/Display'

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0
}

class Calculator extends React.Component{
  state = {
    ...initialState
  }

  addDigit = n => {   
    const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
    
    if(n === '.' && !clearDisplay && this.state.displayValue.includes('.')){
      return false
    }

    const currentValue = clearDisplay ? '' : this.state.displayValue
    const displayValue = currentValue + n
    this.setState({ displayValue, clearDisplay: false })

    if(n !== '.') {
      const newValue = parseFloat(displayValue)
      const values = [...this.state.values]
      values[this.state.current] = newValue

      this.setState({
        values
      })
    }
  }

  clearMemory = () => {
    this.setState({...initialState})
  }

  setOperation = operation => {
    if(this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true })
    } else {
      const equals = operation === '='
      const values = [...this.state.values]
      try {
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`)
      } catch(e) {
        values[0] = this.state.values[0]
      }

      values[1] = 0

      this.setState({
        displayValue: `${values[0]}`,
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: true,
        values
      })
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <Display value={this.state.displayValue} />
        <View style={styles.buttons}>
          <Button label='AC' triple onClick={this.clearMemory} />
          <Button label='/' operation onClick={() => this.setOperation('/')} />
          <Button label='7' onClick={this.addDigit} />
          <Button label='8' onClick={this.addDigit} />
          <Button label='9' onClick={this.addDigit} />
          <Button label='*' operation onClick={() => this.setOperation('*')} />
          <Button label='4' onClick={this.addDigit} />
          <Button label='5' onClick={this.addDigit} />
          <Button label='6' onClick={this.addDigit} />
          <Button label='-' operation onClick={() => this.setOperation('-')} />
          <Button label='1' onClick={this.addDigit} />
          <Button label='2' onClick={this.addDigit} />
          <Button label='3' onClick={this.addDigit} />
          <Button label='+' operation onClick={() => this.setOperation('+')} />
          <Button label='0' double onClick={this.addDigit} />
          <Button label='.' onClick={() => this.addDigit('.')} />
          <Button label='=' operation onClick={() => this.setOperation('=')} />
        </View>
      </View>
    );
  }
}

class SplashScreen extends Component{

  componentDidMount = () => {
    setTimeout(() => {
      this.props.navigation.replace('calculator')
    }, 2500)
  }

  render() {
    return (
      <View style={styles.splashContainer}>
        <Image source={ImageCalculator} style={styles.image}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  splashContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 120,
    height: 120
  }
});

const Switch = createStackNavigator()

export default class App extends Component{

  render() {
    return (
      <NavigationContainer>
        <Switch.Navigator initialRouteName='splash' headerMode={false}>
          <Switch.Screen component={Calculator} name='calculator' />
          <Switch.Screen component={SplashScreen} name='splash'/>
        </Switch.Navigator>
      </NavigationContainer>
    )
  }
}