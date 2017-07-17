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

const firebaseApp = firebase.initializeApp(keychain.firebase);

const DayView = ({day, dogs}) => <View>
                          <Text>{day}</Text>
                          <FlatList data={dogs.map(d => {return {key:d, dog:d}})} renderItem={(i) => <Text key={i.item.key}>{i.item.dog}</Text>}/>
                      </View>

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
    return Object.keys(week).map(d => <DayView key={d} day={d} dogs={week[d]} />)
  }

  render() {
    if (!this.state.items) {
      return <Text>Loading...</Text>
    }
    return (
      <View >
          {Object.keys(this.state.items['schedule']).map(v => <View key={v}><Text>{`${v} - `}</Text>{this.stringifyWeek(this.state.items['schedule'][v])}</View>)}
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
