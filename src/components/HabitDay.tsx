import { TouchableOpacity, Dimensions, TouchableOpacityProps, Text } from 'react-native'
import generateProgress from '../utils/generateProgress'
import clsx from 'clsx'
import dayjs from 'dayjs'

interface HabitDayProps extends TouchableOpacityProps {
  availableHabits?: number
  completedHabits?: number
  date: Date
}

const WEEK_DAYS = 7
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5
export const DAY_MARGIN_BETWEEN = 8
// size of "day" box depends on the screen size, already considering padding
export const DAY_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING - 5)

export default function HabitDay({availableHabits = 0, completedHabits = 0, date, ...rest}:HabitDayProps) {

  const progressPercentage = availableHabits > 0 ? generateProgress(availableHabits, completedHabits) : 0
  const today = dayjs().startOf('day').toDate()
  const isToday = dayjs(date).isSame(today)

  return(
    <TouchableOpacity 
      className={clsx('rounded-lg border-2 m-1', {
        ['bg-zinc-900 border-zinc-800'] : progressPercentage === 0,
        ['bg-violet-900 border-violet-700'] : progressPercentage > 0 && progressPercentage <= 20,
        ['bg-violet-800 border-violet-600'] : progressPercentage > 20 && progressPercentage <= 40,
        ['bg-violet-700 border-violet-500'] : progressPercentage > 40 && progressPercentage <= 60,
        ['bg-violet-600 border-violet-500'] : progressPercentage > 60 && progressPercentage <= 80,
        ['bg-violet-500 border-violet-400'] : progressPercentage > 80,
        ['border-white border-4'] : isToday
      })}
      style={{ width: 34, height: 34 }}
      activeOpacity={0.7}
      {...rest}
    >
    </TouchableOpacity>
  )
}