import { useThemeChangerContext } from '@/presentation/context/ThemeChangerContext'
import ThemedCard from '@/presentation/shared/ThemedCard'
import ThemedSwitch from '@/presentation/shared/ThemedSwitch'
import ThemedView from '@/presentation/shared/ThemedView'
// import { useColorScheme } from 'nativewind'
import { useState } from 'react'
// import { useColorScheme } from 'react-native'

const ThemesScreen = () => {
  // const theme = useColorScheme()

  // DE NATIVEWIND: https://www.nativewind.dev/api/use-color-scheme
  // const { colorScheme, setColorScheme } = useColorScheme()

  const { toogleTheme, currentTheme, isSystemTheme, setSystemTheme } =
    useThemeChangerContext()

  const [darkModeSettings, setDarkModeSettings] = useState({
    // darkMode: theme === 'dark',
    // darkMode: colorScheme === 'dark',
    darkMode: currentTheme === 'dark',
    systemMode: isSystemTheme
  })

  const setDarkMode = (value: boolean) => {
    // setColorScheme(value ? 'dark' : 'light')

    toogleTheme()

    setDarkModeSettings({
      darkMode: value,
      systemMode: false
    })
  }

  const setSystemMode = (value: boolean) => {
    // setColorScheme(
    //   value ? 'system' : darkModeSettings.darkMode ? 'dark' : 'light'
    // )

    if (value) {
      setSystemTheme()
    }

    setDarkModeSettings({
      darkMode: darkModeSettings.darkMode,
      systemMode: value
    })
  }

  return (
    <ThemedView margin>
      <ThemedCard className='mt-5'>
        <ThemedSwitch
          text='Dark mode'
          className='mb-5'
          value={darkModeSettings.darkMode}
          onValueChange={setDarkMode}
        ></ThemedSwitch>
        <ThemedSwitch
          text='System mode'
          value={darkModeSettings.systemMode}
          onValueChange={setSystemMode}
        ></ThemedSwitch>
      </ThemedCard>
    </ThemedView>
  )
}
export default ThemesScreen
