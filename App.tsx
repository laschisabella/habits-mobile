import { StatusBar } from 'react-native';

import Loading from './src/components/Loading';
import Routes from './src/routes';

import './src/lib/dayjs'

import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold
} from '@expo-google-fonts/inter'

export default function App() {

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold
  })

  // if font is unavailable, do not start app (spinner)
  if (!fontsLoaded) {
    return (
      <Loading />
    )
  }

  return (
    <>
      <Routes />
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent/>
    </>
  );
}
