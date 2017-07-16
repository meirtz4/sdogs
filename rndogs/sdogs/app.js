/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import dogs from './dogsdata_v1.json';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        
          {Object.keys(dogs).map(v => <Text>{`Floor ${v.substr(1, 1)} - ${v.substr(2, v.length)} : ${dogs[v]}`}</Text>)}
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
