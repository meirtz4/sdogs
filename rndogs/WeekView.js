import React from 'react';
import {View, FlatList, Text, Button, TouchableHighlight, TouchableOpacity} from 'react-native';

const workDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
const Separator = () => <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
          
        }}
      />
                    
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

const DayIcon = ({dayOfWeek}) => <View style={{ backgroundColor:'#00aeef', borderRadius:30, borderStyle:'solid', borderWidth:1, borderColor:'#00aeef',  width:60, height:60, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
            <Text style={{color:'white', fontSize:20, fontWeight:'bold', textAlign:'center'}}>{dayOfWeek[0]}</Text>
        </View>
const DogNamesList = ({dogs}) => <View style={{flex:2, flexDirection:'column', justifyContent:'space-around'}}>{dogs ? dogs.map(d => <Text key={d} style={{fontSize:16}}>🐶 {d}</Text>) : <Text style={{fontSize:30}}>😸</Text>}</View>

const WeekListItem = ({dayOfWeek, dogs, updateDogSchedule}) => 
    <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'flex-start', paddingTop:30, paddingBottom:30, paddingLeft:10}}>
        <View style={{flex:1}}>
            <DayIcon dayOfWeek={dayOfWeek} />
        </View>
          <DogNamesList dogs={dogs} />  
         <View style={{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <Text style={{flex:1, fontSize:25}}>{statusForNumberOfDogs(dogs ? dogs.length : 0)} </Text>
             <Button style={{flex:1}} onPress={() => {updateDogSchedule(dayOfWeek)}} title={'Toggle my dog'} /> 
        </View> 
        
    </View>

const TouchableWeekListItem = (props) => <TouchableOpacity onPress={() => props.onPress(props.dogs)}><View><WeekListItem updateDogSchedule={props.updateDogSchedule} dayOfWeek={props.dayOfWeek} dogs={props.dogs} /></View></TouchableOpacity>

const WeekView = ({week, onDayPress, updateDogSchedule}) => 
    <View style={{flex:1, justifyContent:'space-around'}}>
        <FlatList 
        data={workDays.map(d => ({key:d, name:d}))} 
        renderItem={({item}) => <TouchableWeekListItem dayOfWeek={item.name} dogs={week[item.name]} onPress={onDayPress} updateDogSchedule={updateDogSchedule}/>}
        ItemSeparatorComponent={() => <Separator />} />
    </View>

export default WeekView;