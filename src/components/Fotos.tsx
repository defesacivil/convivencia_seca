import React, { useEffect, useState } from "react"
import { Button, View, Image, Platform, StyleSheet, Text } from "react-native"
import * as ImagePicker from "expo-image-picker"
import { Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"

const ImagePickerScreen = () => {
  const [image, setImage] = useState("")

  useEffect(() => {
    ;(async () => {
      if (Platform.OS !== "web") {
        const libraryStatus =
          await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (libraryStatus.status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!")
        }

        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync()
        if (cameraStatus.status !== "granted") {
          alert("Sorry, we need camera permissions to make this work!")
        }
      }
    })()
  }, [])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Pressable onPress={useNavigation}>
        <Text
          style={{
            fontSize: 18,
            marginBottom: 10,
            color: "#003F5C",
            padding: 25,
          }}
        >
          Go To Profile
        </Text>
      </Pressable>
    </View>
  )
}

export default ImagePickerScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
})
