import { Touchable, View } from 'react-native'
import Icon from '@expo/vector-icons/Feather'

import SpacetimeLogo from '../src/assets/spacetimeLogo.svg'
import { styled } from 'nativewind'
import { Link } from 'expo-router'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
const StyledLogo = styled(SpacetimeLogo)

export default function newMemory() {
  const { bottom, top } = useSafeAreaInsets()

  return (
    <View
      className="flex-1 px-8"
      style={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className="mt-4 flex-row items-center justify-between">
        <StyledLogo />

        <Link href="/memories" asChild>
          <TouchableOpacity className=" h-10 w-10 items-center justify-center rounded-full bg-purple-500">
            <Icon name="arrow-left" size={16} color="#fff" />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  )
}
