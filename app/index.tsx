import { StatusBar } from 'expo-status-bar'
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'

import blurBg from '../src/assets/backgroundBlur.png'
import Stripes from '../src/assets/stripes.svg'
import SpacetimeLogo from '../src/assets/spacetimeLogo.svg'
import { styled } from 'nativewind'
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session'
import { api } from '../src/lib/api'

const StyledStripes = styled(Stripes)
const StyledLogo = styled(SpacetimeLogo)

const gitClientId = 'f4cdce80dd39abb40228'

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: `https://github.com/settings/connection/applications/${gitClientId}`,
}

export default function App() {
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  const [response, signInWithGithub] = useAuthRequest(
    {
      clientId: gitClientId,
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'spacetime',
      }),
    },
    discovery,
  )

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params

      api
        .post('/register', {
          code,
        })
        .then((response) => {
          const { token } = response.data

          SecureStore.setItemAsync('toke', token)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }, [response])

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
          onPress={() => signInWithGithub()}
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
