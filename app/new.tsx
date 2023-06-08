import { View, Switch, Text } from 'react-native'
import Icon from '@expo/vector-icons/Feather'

import SpacetimeLogo from '../src/assets/spacetimeLogo.svg'
import { styled } from 'nativewind'
import { Link } from 'expo-router'
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useState } from 'react'
const StyledLogo = styled(SpacetimeLogo)

export default function newMemory() {
  const { bottom, top } = useSafeAreaInsets()

  const [isPublic, setIsPublic] = useState(false)

  return (
    <ScrollView
      className="flex-1 px-8"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className="mt-4 flex-row items-center justify-between">
        <StyledLogo />

        <Link href="/memories" asChild>
          <TouchableOpacity className=" h-10 w-10 items-center justify-center rounded-full bg-purple-500">
            <Icon name="arrow-left" size={16} color="#fff" />
          </TouchableOpacity>
        </Link>
      </View>
      <View className="mt-6 space-y-6">
        <View className="flex-row items-center gap-2">
          <Switch
            value={isPublic}
            onValueChange={setIsPublic}
            trackColor={{
              true: '#372560',
            }}
            thumbColor={'#9b79ea'}
          />
          <Text className="font-body text-base text-base text-gray-200">
            Turn it public
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          className=" h-32 items-center justify-center rounded-lg border border-dashed border-gray-500 bg-black/20"
        >
          <View className="flex-row items-center gap-2">
            <Icon name="image" color={'#FFF'} />
            <Text className="font-body text-sm text-gray-200">
              Add Photo or Video
            </Text>
          </View>
        </TouchableOpacity>

        <TextInput
          multiline
          className="p-0 font-body text-lg text-gray-50"
          placeholderTextColor="#56565a"
          placeholder="Add a description of this moment to remember. Photos, Videos e how you feel at that moment is only some examples of what you can do here."
        />

        <TouchableOpacity
          activeOpacity={0.6}
          className="mt-6 h-10 w-20 items-center self-end rounded-full bg-green-500 px-5 py-2"
        >
          <Text className="font-alt text-sm uppercase text-black"> SAVE</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
