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

const DayIcon = ({dayOfWeek}) => <View style={{ backgroundColor:'#00aeef', borderRadius:30, borderStyle:'solid', borderWidth:1, width:60, height:60, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
            <Text style={{color:'white', fontSize:20, fontWeight:'bold', textAlign:'center'}}>{dayOfWeek[0]}</Text>
        </View>

const WeekListItem = ({dayOfWeek, dogs}) => 
    <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'flex-start', paddingTop:30, paddingBottom:30, paddingLeft:10}}>
        <View style={{flex:1}}>
            <DayIcon dayOfWeek={dayOfWeek} />
        </View>
        
        <Text style={{flex:2, fontSize:30}}>{dogs ? '🐶'.repeat(dogs.length) : '😸'}</Text>
        
        
         <View style={{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <Text style={{flex:1, fontSize:25}}>{statusForNumberOfDogs(dogs ? dogs.length : 0)} </Text>
             <Button style={{flex:1}} onPress={() => {}} title={'More...'} /> 
        </View> 
        
    </View>

const WeekView = ({week}) => 
    <View style={{flex:1, justifyContent:'space-around'}}>
        <FlatList 
        data={workDays.map(d => ({key:d, name:d}))} 
        renderItem={({item}) => <WeekListItem dayOfWeek={item.name} dogs={week[item.name]} />}
        ItemSeparatorComponent={() => <Separator />} />
    </View>

export default WeekView;