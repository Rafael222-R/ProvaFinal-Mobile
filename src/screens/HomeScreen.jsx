import { FlatList, StyleSheet, View } from "react-native";
import {
  Card,
  Text,
  ActivityIndicator,
  MD2Colors,
  Avatar,
} from "react-native-paper";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function HomeScreen({ navigation, route }) {
  const [produtos, setProdutos] = useState([]);
  const carrinhoAnterior = route.params?.carrinhoAtual || [];

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products?delay=5000")
      .then((res) => {
        console.log(res.data);
        setProdutos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={produtos}
        renderItem={({ item }) => (
          <Card
            style={styles.card}
            onPress={() =>
              navigation.navigate("ProdutoScreen", {
                id: item.id,
                carrinhoAnterior: carrinhoAnterior,
              })
            }
          >
            <Card.Cover source={{ uri: item.image }} style={{ height: 150 }} />
            <Card.Title
              title={item.title}
              titleNumberOfLines={2}
              subtitle={`Valor: ${item.price}`}
            />
          </Card>
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // <- ESSENCIAL!
        columnWrapperStyle={styles.row} // <- Para aplicar espaçamento entre colunas
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator animating={true} color={MD2Colors.red800} />
            <Text> Carregando ....</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 10,
  },
  card: {
    width: "48%",
    backgroundColor: "#eee",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 10,
  },
});
