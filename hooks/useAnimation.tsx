import { useRef } from 'react'
import { Animated, Easing } from 'react-native'

export const useAnimation = () => {
  const animatedOpacity = useRef(new Animated.Value(0)).current
  const animatedTop = useRef(new Animated.Value(0)).current

  const fadeIn = ({
    duration = 300,
    toValue = 1,
    useNativeDriver = true,
    easing = Easing.linear,
    callback = () => {}
  }) => {
    Animated.timing(animatedOpacity, {
      toValue,
      duration,
      useNativeDriver,
      easing: easing
    }).start(callback)
  }

  const fadeOut = ({
    duration = 300,
    toValue = 0,
    useNativeDriver = true,
    easing = Easing.ease,
    callback = () => {}
  }) => {
    Animated.timing(animatedOpacity, {
      toValue,
      duration,
      useNativeDriver,
      easing
      // }).start(() => animatedTop.setValue(-100))
    }).start(callback)
  }

  const startMovingTopPosition = ({
    initialPosition = -100,
    duration = 300,
    toValue = 0,
    useNativeDriver = true,
    easing = Easing.ease,
    callback = () => {}
  }) => {
    animatedTop.setValue(initialPosition)

    Animated.timing(animatedTop, {
      toValue,
      duration,
      useNativeDriver,
      // easing: Easing.elastic(10)
      // easing: Easing.bounce
      easing
    }).start(callback)
  }

  return {
    animatedTop,
    animatedOpacity,

    fadeIn,
    fadeOut,
    startMovingTopPosition
  }
}
