/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import * as firebase from 'firebase';
import React, { Component } from 'react';
import keychain from './private.json';
import LoadingView from './LoadingView.js';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Button,
  AsyncStorage,
  TextInput
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import AreaView from './AreaView.js';

const DogNameState = {
  Unknown : 0,
  Loading: 1,
  Loaded : 2
}

const DailyView = ({navigation}) => 
   <View style={{flex:1}}>{navigation.state.params.dogs ? navigation.state.params.dogs.map(d=> <Text key={d}>{d}</Text>): <Text>No Dogs Today</Text>}</View>;

const firebaseApp = firebase.initializeApp(keychain.firebase);

const AreasListItem = ({area, schedule ,navigate, updateDogSchedule, fbref}) => <Button key={area} title={area} onPress={() => navigate('Area', {area: area, weeks: [schedule[area]], updateDogSchedule:updateDogSchedule, fbref:fbref})} />

class DogNameForm extends Component {
  render() {
    const {submit} = this.props;
    return (
      <View>
        <TextInput placeholder="What is your dog's name?"
                  onChangeText={(t) => this.setState({text:t})} />
        <Button title="Save" onPress={() => submit(this.state.text)} />
          
      </View>
    )
  }
}

class App extends Component {

  static navigationOptions = ({navigation}) => ({
        title: '🐶Soluto Dogs🐶'
    }); 

  constructor(props) {
    super(props);
    this.itemsRef = firebase.database().ref();
    this.state = {dogNameState: DogNameState.Unknown};
  }

  componentDidMount() {
    this.itemsRef.on('value', (items) => {
      this.setState({items: items.val()})
    });
    AsyncStorage.getItem('dogName').then(d => this.setState({dogName: d, dogNameState: DogNameState.Loaded}));
    this.setState({dogNameState: DogNameState.Loading});
  }

  saveDogName(dogName) {
    AsyncStorage.setItem('dogName', dogName).then(() => this.setState({dogName: dogName, dogNameState: DogNameState.Loaded}));
  }

  updateDogSchedule(area, day) {
    if (this.state.items['schedule'][area][day]) {
      if(this.state.items['schedule'][area][day].includes(this.state.dogName)) {
        let dogsForTheDay = this.state.items['schedule'][area][day].filter(d => d != this.state.dogName);
        let path = `/schedule/${area}/${day}`;
        const update = {};
        update[path] = dogsForTheDay;
        firebase.database().ref().update(update);
      } else {
        let dogsForTheDay = this.state.items['schedule'][area][day];
        dogsForTheDay.push(this.state.dogName);
        let path = `/schedule/${area}/${day}`;
        const update = {};
        update[path] = dogsForTheDay;
        firebase.database().ref().update(update);
      }
    } else {
      let days = this.state.items['schedule'][area];
      
      let path = `/schedule/${area}/${day}`;
      const update = {};
        update[path] = [this.state.dogName];
        firebase.database().ref().update(update);
    }
  }

  render() {
    if (this.state.dogNameState != DogNameState.Loaded) {
      return <LoadingView />
    }
    if (!this.state.items) {
      return <LoadingView />
    }
    if (!this.state.dogName) {
      return <DogNameForm submit={(dogName) => this.saveDogName(dogName)} />
    }
    const { navigate } = this.props.navigation;
    const areas = Object.keys(this.state.items['schedule']).map(area => ({key: area, data: area}));
    return (
      <View style={{flex:1}}>
        <FlatList data={areas} renderItem={({item}) => <AreasListItem area={item.data} schedule={this.state.items['schedule']} navigate={navigate} updateDogSchedule={this.updateDogSchedule.bind(this)} fbref={this.itemsRef}/>} />
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

const MainView = StackNavigator({
  Home: {screen: App},
  Area: {screen: AreaView},
  Day: {screen: DailyView}
});


export default MainView;