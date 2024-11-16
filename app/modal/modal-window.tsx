import ThemedButton from '@/presentation/shared/ThemedButton'
import ThemedView from '@/presentation/shared/ThemedView'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Platform, Text } from 'react-native'

const ModalScreen = () => {
  return (
    <ThemedView
      bgColor='#A52182'
      className='justify-center items-center flex-1'
    >
      <Text>Hola, soy un modal</Text>

      <ThemedButton
        className='my-4'
        onPress={() => router.push('/modal/modal-window-2')}
      >
        Otro modal
      </ThemedButton>
      <ThemedButton onPress={() => router.dismiss()}>Cerrar</ThemedButton>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </ThemedView>
  )
}

export default ModalScreen
