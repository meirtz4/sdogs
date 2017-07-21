import React from 'react';
import {View, FlatList, Text, Button} from 'react-native';

const workDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
const Separator = () => <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
          
        }}
      />
const DayView = ({day, dogs}) => 
                        <View style={{flex:1, flexDirection:'column'}}>
                          <Text>{day}</Text>
                          <FlatList  data={dogs.map(d => {return {key:d, dog:d}})} renderItem={(i) => <Text style={{flex:1}} key={i.item.key}>{i.item.dog}</Text>}/>
                        </View>
                    
const statusForNumberOfDogs = (numberOfDogs) => {
    
    switch (numberOfDogs) {
        case 0: return '😢';
        case 1: return '😊';
        case 2: return '😃';
        case 3: return '🤗';
        case 4: return '🤔';
        case 5: return '😨';
        default: return '😱';
    }
    
}
const WeekListItem = ({dayOfWeek, dogs}) => 
<View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
<View style={{flex:1, flexDirection:'column'}}>
        <Text style={{fontSize:20, fontWeight:'bold', marginBottom:5}}>{dayOfWeek}</Text>
        <Text style={{fontSize:20, marginBottom:5}}>{dogs ? '🐶'.repeat(dogs.length) : 'No dogs'}</Text>
        </View>
        <Text style={{flex:1, fontSize:25}}>{statusForNumberOfDogs(dogs ? dogs.length : 0)} </Text>
        <Button style={{flex:1}} onPress={() => {}} title={'More...'} />
    </View>

const WeekView = ({week}) => 
    <View style={{flex:1, justifyContent:'space-around'}}>
        <FlatList 
        data={workDays.map(d => ({key:d, name:d}))} 
        renderItem={({item}) => <WeekListItem dayOfWeek={item.name} dogs={week[item.name]} />}
        ItemSeparatorComponent={() => <Separator />} />
    </View>

export default WeekView;