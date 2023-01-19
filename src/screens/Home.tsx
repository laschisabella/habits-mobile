import { View, Text, ScrollView } from 'react-native';
import HabitDay, { DAY_SIZE } from '../components/HabitDay';
import Header from '../components/Header';
import generateDates from '../utils/generateDates'

const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const datesFromBeginningYear = generateDates()
const minimumSize = 18 * 7 // 10 weeks
const amountOfDaysToFill = minimumSize - datesFromBeginningYear.length

export default function Home() {
  return(
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className='flex-row mt-8 mb-2 mx-auto'>
        {
          weekDays.map((weekDay, i) => {
            return <Text 
              key={i} 
              className="text-zinc-400 text-xl font-bold text-center px-3"
              style={{ width: DAY_SIZE }}
            >
              {weekDay}
            </Text>
          })
        }
      </View>

      <ScrollView>
        <View
          className='flex-row flex-wrap mx-auto'
        >
          {
            datesFromBeginningYear.map(date => (
              <HabitDay
                key={date.toISOString()} 
              />
            ))
          }

          {
            amountOfDaysToFill > 0 && Array
            .from({ length: amountOfDaysToFill })
            .map((_, index) => (
              <View
                key={index}
                className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                style={{ width: DAY_SIZE, height: DAY_SIZE }}
              />
            ))
          }
        </View>
      </ScrollView>

      

      

    </View>
  )
}