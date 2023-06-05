import { styled } from 'nativewind'
import React from 'react'
import { ImageBackground } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'

import blurBg from '../src/assets/backgroundBlur.png'
import Stripes from '../src/assets/stripes.svg'
import SpacetimeLogo from '../src/assets/spacetimeLogo.svg'
import { Slot, SplashScreen } from 'expo-router'

const StyledStripes = styled(Stripes)
const StyledLogo = styled(SpacetimeLogo)

export default function Layout() {
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  if (!hasLoadedFonts) {
    return <SplashScreen />
  }

  return (
    <ImageBackground
      source={blurBg}
      className="relative flex-1 items-center bg-gray-900 px-8"
      imageStyle={{ position: 'absolute', left: '-110%' }}
    >
      <StyledStripes className="absolute left-2" />
      <StatusBar style="light" translucent />
      <Slot />
    </ImageBackground>
  )
}
