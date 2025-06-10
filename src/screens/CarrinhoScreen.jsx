import React from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import { Text, Card, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useCarrinho } from "../contexts/CarrinhoContext"

export default function CarrinhoScreen() {
  const { carrinho } = useCarrinho(); // <- acessando o carrinho global
  const navigation = useNavigation();

  if (carrinho.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
        <Image
          source={require("../doc/carrinho.png")}
          style={styles.emptyImage}
        />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {carrinho.map((item, index) => (
          <Card key={index} style={{ marginBottom: 16 }}>
            <Card.Cover
              source={{ uri: item.produto.image }}
              style={{ height: 150 }}
            />
            <Card.Title title={item.produto.title} />
            <Card.Content>
              <Text>Quantidade: {item.quantidade}</Text>
              <Text>Preço unitário: R$ {item.produto.price}</Text>
              <Text style={{ fontWeight: "bold" }}>
                Total: R$ {item.total.toFixed(2)}
              </Text>
            </Card.Content>
          </Card>
        ))}

        <Button
          mode="contained"
          onPress={() =>
            navigation.navigate("TabRoutes", {
              screen: "HomeScreen",
            })
          }
        >
          Continuar Comprando
        </Button>

        <Button
          mode="contained"
          style={{ marginTop: 20 }}
          onPress={() => alert("Finalizar compra em breve!")}
        >
          Finalizar Compra
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: "#fff",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
  },
  emptyImage: {
    width: 150,
    height: 150,
    marginTop: 20,
  },
});
