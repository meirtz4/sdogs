/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import * as firebase from 'firebase';
import React, { Component } from 'react';
// import dogs from './dogsdata_v1.json';
import keychain from './private.json';
import {
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native';
import AreaView from './AreaView.js';

const firebaseApp = firebase.initializeApp(keychain.firebase);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.itemsRef = firebase.database().ref();
    this.state = {};
  }

  componentDidMount() {
    this.itemsRef.on('value', (items) => {
      
      this.setState({items: items.val()})
    })
  }

  render() {
    if (!this.state.items) {
      return <Text>Loading...</Text>
    }
    return (
      <View >
          {Object.keys(this.state.items['schedule']).map(v => <AreaView key={v} area={v} weeks={[this.state.items['schedule'][v]]} />)}
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
