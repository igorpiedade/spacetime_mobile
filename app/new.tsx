/* eslint-disable react-hooks/rules-of-hooks */
import {
  View,
  Switch,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import Icon from '@expo/vector-icons/Feather'

import SpacetimeLogo from '../src/assets/spacetimeLogo.svg'
import { styled } from 'nativewind'
import { Link, useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import * as SecureStore from 'expo-secure-store'
import { api } from '../src/lib/api'

const StyledLogo = styled(SpacetimeLogo)

export default function newMemory() {
  const { bottom, top } = useSafeAreaInsets()
  const router = useRouter()

  const [preview, setPreview] = useState<string | null>(null)
  const [content, setContent] = useState('')
  const [isPublic, setIsPublic] = useState(false)

  async function openImagePicker() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      })

      if (result.assets[0]) {
        setPreview(result.assets[0].uri)
      }
    } catch (err) {
      console.log('User did not select a picture')
    }
  }

  async function handleCreateMemory() {
    const token = await SecureStore.getItemAsync('token')

    let coverURL = ''

    if (preview) {
      const uploadFormData = new FormData()

      uploadFormData.append('file', {
        uri: preview,
        name: 'image.jpg',
        type: 'image/jpeg',
      } as any)

      const uploadResponse = await api.post('/upload', uploadFormData, {
        headers: {
          'Content-Type': 'multipart/form-fileIrl',
        },
      })
      coverURL = uploadResponse.data.fileUrl
    }

    await api.post(
      '/memories',
      {
        content,
        isPublic,
        coverURL,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    router.push('/memories')
  }

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
          onPress={openImagePicker}
          className=" h-32 items-center justify-center rounded-lg border border-dashed border-gray-500 bg-black/20"
        >
          {preview ? (
            <Image
              source={{ uri: preview }}
              className="h-full w-full rounded-lg object-cover"
            />
          ) : (
            <View className="flex-row items-center gap-2">
              <Icon name="image" color={'#FFF'} />
              <Text className="font-body text-sm text-gray-200">
                Add Photo or Video
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          multiline
          value={content}
          onChangeText={setContent}
          className="p-0 font-body text-lg text-gray-50"
          placeholderTextColor="#56565a"
          placeholder="Add a description of this moment to remember. Photos, Videos e how you feel at that moment is only some examples of what you can do here."
        />

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={handleCreateMemory}
          className="mt-6 h-10 w-20 items-center self-end rounded-full bg-green-500 px-5 py-2"
        >
          <Text className="font-alt text-sm uppercase text-black"> SAVE</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
