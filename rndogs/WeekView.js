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
                    

const WeekListItem = ({dayOfWeek, dogs}) => 
<View style={{flex:1, flexDirection:'row'}}>
<View style={{flex:1, flexDirection:'column'}}>
        <Text style={{fontSize:20, fontWeight:'bold', marginBottom:5}}>{dayOfWeek}</Text>
        <Text style={{fontSize:20, fontWeight:'bold', marginBottom:5}}>{dogs ? '🐶'.repeat(dogs.length) : 'No dogs 😢'}</Text>
        </View>
        <Button onPress={() => {}} title={'More...'} />
    </View>

const WeekView = ({week}) => 
    <View style={{flex:1, justifyContent:'space-around'}}>
        <FlatList 
        data={workDays.map(d => ({key:d, name:d}))} 
        renderItem={({item}) => <WeekListItem dayOfWeek={item.name} dogs={week[item.name]} />}
        ItemSeparatorComponent={() => <Separator />} />
    </View>

export default WeekView;