import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function ImagemCompletaScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { imageUrl } = route.params;

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.goBack()}>
      <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="contain" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
