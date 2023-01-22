import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // redirection

export function HabitEmpty() {

  const { navigate } = useNavigation()

  return(
    <Text
      className='text-zinc-400 text-base'
    >
      You haven't created any habit yet.{' '}

      <Text
        className='text-violet-400 text-base underline active:text-violet-500'
        onPress={(() => navigate('new'))}
      >
        Create new habit
      </Text>
    </Text>
  )
}