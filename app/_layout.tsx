// import {
//   DarkTheme,
//   DefaultTheme,
//   ThemeProvider
// } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'

import { useThemeColor } from '@/hooks/useThemeColor'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { allRoutes } from '@/constants/Routes'
import { Stack } from 'expo-router'

import { ThemeChangerProvider } from '@/presentation/context/ThemeChangerContext'
import '../global.css'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const backgroundColor = useThemeColor(
    {
      // light: 'red', dark: 'indigo'
    },
    'background'
  )

  // const colorScheme = useColorScheme()

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <GestureHandlerRootView
      style={{ backgroundColor: backgroundColor, flex: 1 }}
    >
      {/* <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}> */}
      <ThemeChangerProvider>
        <Stack
          screenOptions={{
            // headerShown: false
            headerShadowVisible: false,
            contentStyle: {
              backgroundColor: backgroundColor
            },
            headerStyle: {
              backgroundColor: backgroundColor
            }
          }}
        >
          <Stack.Screen
            name='index'
            options={{
              title: 'Components APP'
            }}
          />

          {allRoutes.map((route) => (
            <Stack.Screen
              key={route.name}
              name={route.name}
              options={{
                title: route.title,
                headerShown: !route.title.includes('Slides')
              }}
            />
          ))}
        </Stack>
      </ThemeChangerProvider>
      {/* </ThemeProvider> */}
    </GestureHandlerRootView>
  )
}
