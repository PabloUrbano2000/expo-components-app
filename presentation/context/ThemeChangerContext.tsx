import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react'

import { Colors } from '@/constants/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from '@react-navigation/native'
import { useColorScheme } from 'nativewind'

interface ThemeChangerContextType {
  currentTheme: 'light' | 'dark'
  isSystemTheme: boolean
  bgColor: string

  toogleTheme: () => void
  setSystemTheme: () => void
}

const ThemeChangerContext = createContext({} as ThemeChangerContextType)

// customhook
export const useThemeChangerContext = () => {
  const themeChanger = useContext(ThemeChangerContext)

  return themeChanger
}

// provider
export const ThemeChangerProvider = ({ children }: PropsWithChildren) => {
  const { colorScheme, setColorScheme } = useColorScheme()

  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark')
  const [isSystemThemeEnabled, setIsSystemThemeEnabled] = useState(true)

  const currentTheme = isSystemThemeEnabled
    ? colorScheme
    : isDarkMode
    ? 'dark'
    : 'light'

  const backgroundColor = isDarkMode
    ? Colors.dark.background
    : Colors.light.background

  useEffect(() => {
    AsyncStorage.getItem('selected-theme').then((theme) => {
      if (!theme) return
      setIsDarkMode(theme === 'dark')
      setIsSystemThemeEnabled(theme === 'system')
      setColorScheme(theme as 'light' | 'dark' | 'system')
    })
  }, [])

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ThemeChangerContext.Provider
        value={{
          currentTheme: currentTheme ?? 'light',
          isSystemTheme: isSystemThemeEnabled,
          bgColor: backgroundColor,

          toogleTheme: async () => {
            setIsDarkMode(!isDarkMode)
            setColorScheme(isDarkMode ? 'light' : 'dark')
            setIsSystemThemeEnabled(false)

            // guardar en Storage
            await AsyncStorage.setItem(
              'selected-theme',
              isDarkMode ? 'light' : 'dark'
            )
          },
          setSystemTheme: async () => {
            setIsSystemThemeEnabled(true)
            setColorScheme('system')

            // guardar en Storage
            await AsyncStorage.setItem('selected-theme', 'system')
          }
        }}
      >
        {children}
      </ThemeChangerContext.Provider>
    </ThemeProvider>
  )
}
