import { useState } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import BackButton from '../components/BackButton';
import Checkbox from '../components/Checkbox';
import { api } from '../lib/axios';

const availableWeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function New() {

  const [title, setTitle] = useState('')
  // checked week days
  const [ weekDays, setWeekDays] = useState<number[]>([])

  function handleToggleWeekDay(weekDayIndex: number){
    
    // if weekDayIndex exists, uncheck
    if(weekDays.includes(weekDayIndex)){
      setWeekDays(prevState => [...prevState.filter(weekDay => weekDay !== weekDayIndex)])
      
    } else { // if weekDayIndex doesn't exist, check
      setWeekDays(prevState => [...prevState, weekDayIndex])
    }
  }

  async function handleCreateNewHabit() {
    try {
      // validation
      if(!title.trim() || weekDays.length === 0) {
        return Alert.alert('New habit', 'Please, enter a habit and its frequency')
      }

      await api.post('/habits', { title, weekDays })

      setTitle('')
      setWeekDays([])

      Alert.alert('New habit', 'Success message')
    } catch (err) {
      console.log(err)
      Alert.alert('Oh no', 'Could not create habit')
    } {

    }
  }

  return(
    <View className='flex-1 bg-background px-8 pt-16'>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <BackButton />

        <Text className='mt-6 text-white font-extrabold text-3xl'>
          Create habit
        </Text>

        <Text className='mt-6 text-white font-semibold text-base'>
          What's your new habit?
        </Text>
        <TextInput 
          className='h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600'
          placeholder='Go to the gym'
          placeholderTextColor={colors.zinc[600]}
          onChangeText={setTitle}
          value={title}
        />

        <Text className='mt-3 text-white font-semibold text-base mb-3'>
          How often will you do it?
        </Text>
        {
          availableWeekDays.map((weekDay, index) => (
            <Checkbox
              key={index}
              title={weekDay}
              checked={weekDays.includes(index)}
              onPress={() => handleToggleWeekDay(index)}
            />
          ))  
        }

        {/* button */}
        <TouchableOpacity
          className='w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-9'
          activeOpacity={0.7}
          onPress={handleCreateNewHabit}
        >
          <Feather 
            name="check"
            size={20}
            color={colors.white}
          />

          <Text className='font-semibold text-base text-white ml-2'>
            Create new habit
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  )
}