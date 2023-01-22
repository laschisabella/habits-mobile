import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import HabitDay, { DAY_SIZE } from '../components/HabitDay';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { api } from '../lib/axios';
import generateDates from '../utils/generateDates'

type SummaryProps = Array<{
  id: string
  date: string
  available: number
  completed: number
}>

const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const datesFromBeginningYear = generateDates()
const minimumSize = 12 * 7
const amountOfDaysToFill = minimumSize - datesFromBeginningYear.length

export default function Home() {

  const { navigate } = useNavigation()
  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState<SummaryProps | null>(null)

  async function fetchData(){
    try {
      setLoading(true)
      const response = await api.get('/summary')
      setSummary(response.data)
    } catch (error) {
      Alert.alert('Error','Habits could not be displayed')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return(
      <Loading />
    )
  }

  return(
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className='flex-row mt-6 mb-2 -mx-2'>
        {
          weekDays.map((weekDay, i) => {
            return <Text 
              key={i} 
              className="text-zinc-400 text-xl font-bold text-center"
              style={{ width: DAY_SIZE }}
            >
              {weekDay}
            </Text>
          })
        }
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >

        {
          summary &&
          <View className='flex-row flex-wrap'>
            {
              datesFromBeginningYear.map(date => {
                
                const dayWithHabits = summary.find(day => {
                  return dayjs(date).isSame(day.date, 'day')
                })
                
                return (
                  <HabitDay
                    key={date.toISOString()}
                    date={date}
                    availableHabits={dayWithHabits?.available}
                    completedHabits={dayWithHabits?.completed}
                    onPress={() => navigate('habit', { date: date.toISOString()})}
                  />
                )
              })
            }

            {
              amountOfDaysToFill > 0 && Array
              .from({ length: amountOfDaysToFill })
              .map((_, index) => (
                <View
                  key={index}
                  className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                  style={{ width: 34, height: 34 }}
                />
              ))
            }
          </View>

        }

        
      </ScrollView>

      

      

    </View>
  )
}