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
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

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

  stringifyWeek(week) {
    return Object.keys(week).map(d => `${d}: ${week[d]}`)
  }

  render() {
    if (!this.state.items) {
      return <Text>Loading...</Text>
    }
    return (
      <View style={styles.container}>
        <Text>
          {/*{JSON.stringify(Object.keys(this.state.items))}*/}
          </Text>
          {Object.keys(this.state.items['schedule']).map(v => <Text key={v}>{`${v} - ${this.stringifyWeek(this.state.items['schedule'][v])}`}</Text>)}
          {/*{this.state.items.map(i => <Text>{`${Object.keys(i)[0]}`}</Text>)}*/}
          
        
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
