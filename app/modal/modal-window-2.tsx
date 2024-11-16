import ThemedButton from '@/presentation/shared/ThemedButton'
import ThemedView from '@/presentation/shared/ThemedView'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Platform, Text } from 'react-native'

const Modal2Screen = () => {
  return (
    <ThemedView className='justify-center items-center flex-1'>
      <Text>Hola, soy otro modal</Text>

      <ThemedButton className='my-4' onPress={() => router.dismiss()}>
        Cerrar
      </ThemedButton>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </ThemedView>
  )
}

export default Modal2Screen
