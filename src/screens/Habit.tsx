import { View, ScrollView, Text, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';

import dayjs from 'dayjs';

import BackButton from '../components/BackButton';
import ProgressBar from '../components/ProgressBar';
import Checkbox from '../components/Checkbox';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { api } from '../lib/axios';
import generateProgress from '../utils/generateProgress';
import { HabitEmpty } from '../components/HabitEmpty';
import clsx from 'clsx';

interface DateParams {
  date: string;
}

interface DayInfoProps {
  completedHabits: string[]
  availableHabits: {
    id: string
    title: string
  }[]
}

export default function Habit() {

  const [loading, setLoading] = useState(true)
  const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null)
  const [completedHabits, setCompletedHabits] = useState<string[]>([])

  const route = useRoute()
  const { date } = route.params as DateParams

  const parsedDate = dayjs(date)
  const dayOfWeek = parsedDate.format('dddd')
  const dayAndMonth = parsedDate.format('DD/MM')
  const isDateInPast = parsedDate.endOf('day').isBefore(new Date())

  const habitsProgress = dayInfo?.availableHabits.length ? generateProgress(dayInfo.availableHabits.length, completedHabits.length) : 0

  async function fetchHabits() {
    try {
      setLoading(true)

      const response = await api.get('/day', { params: { date } })
      setDayInfo(response.data)
      setCompletedHabits(response.data.completedHabits)

    } catch (error) {
      console.log(error)
      Alert.alert('Error', 'Not possible fetch data')

    } finally {
      setLoading(false)
    }
  }

  async function handleToggleHabit(habitId: string) {

    try {
      await api.patch(`/habits/${habitId}/toggle`)

      if(completedHabits.includes(habitId)){
        setCompletedHabits(prevState => prevState.filter(habit => habit !== habitId))
      } else {
        setCompletedHabits(prevState => [...prevState, habitId])
      }
      
    } catch (error) {
      console.log(error)
      Alert.alert('Error', 'Not possible update habits')
    }



  }

  useEffect(() => {
    fetchHabits()
  }, [])

  if (loading) {
    return(
      <Loading />
    )
  }


  return(
    <View className='flex-1 bg-background px-8 pt-16'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className='mt-6 text-zinc-400 font-semibold text-base lowercase'>
          {dayOfWeek}
        </Text>
        <Text className=' text-white font-extrabold text-3xl'>
          {dayAndMonth}
        </Text>

        <ProgressBar progress={habitsProgress} />

        <View className={clsx('mt-10', {
          ['opacity-50'] : isDateInPast
        })}>
          {
            dayInfo?.availableHabits ? 
            dayInfo?.availableHabits.map(habit => (
              <Checkbox
                key={habit.id}
                title={habit.title}
                checked={completedHabits.includes(habit.id)}
                disabled={isDateInPast}
                onPress={() => handleToggleHabit(habit.id)}
              />
            ))
            : <HabitEmpty />
          }      
        </View>

        {
          isDateInPast && (
            <Text className='text-white mt-10 text-center '>
              You can't register habits on past dates.
            </Text>
          )
        }

      </ScrollView>
    </View>
  )
}