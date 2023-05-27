import { StatusBar } from 'expo-status-bar'
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'

import blurBg from './src/assets/backgroundBlur.png'
import Stripes from './src/assets/stripes.svg'
import SpacetimeLogo from './src/assets/spacetimeLogo.svg'
import { styled } from 'nativewind'
import React from 'react'

const StyledStripes = styled(Stripes)
const StyledLogo = styled(SpacetimeLogo)

export default function App() {
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  if (!hasLoadedFonts) {
    return null
  }

  return (
    <ImageBackground
      source={blurBg}
      className="relative flex-1 items-center bg-gray-900 px-8"
      imageStyle={{ position: 'absolute', left: '-110%' }}
    >
      <StyledStripes className="absolute left-2" />

      <View className="flex-1 items-center justify-center gap-6">
        <StyledLogo />
        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            {' '}
            Your time capsule{' '}
          </Text>
          <Text className=" text-center font-body text-base leading-relaxed text-gray-100">
            {' '}
            Collect your most important milestones and share - if you want -
            with the world!{' '}
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          className="rounded-full bg-green-500 px-5 py-2"
        >
          <Text className="font-alt text-sm uppercase text-black">
            {' '}
            CREATE A MEMORY
          </Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="light" />
    </ImageBackground>
  )
}
