import React from 'react';
import {View, FlatList, Text} from 'react-native';

const DayView = ({day, dogs}) => <View>
                          <Text>{day}</Text>
                          <FlatList data={dogs.map(d => {return {key:d, dog:d}})} renderItem={(i) => <Text key={i.item.key}>{i.item.dog}</Text>}/>
                      </View>

const WeekView = ({week}) => <View>{['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'].map(day => 
                                            week[day] ? 
                                                    <DayView key={day} day={day} dogs={week[day]} /> : 
                                                    <Text key={day}>No dogs are coming on {day}</Text>)}
                                    </View>

export default WeekView;