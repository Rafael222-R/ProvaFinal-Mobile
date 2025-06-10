import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Text,
  Card,
  ActivityIndicator,
  Button,
  TextInput,
} from "react-native-paper";
import axios from "axios";
import { useCarrinho } from "../contexts/CarrinhoContext";

export default function ProdutoScreen({ navigation, route }) {
  console.log("ID DO PRODUTO RECEBIDO: ", route.params);

  const { id, carrinhoAnterior = [] } = route.params;
  const { adicionarAoCarrinho } = useCarrinho();
  const [produtoId, setProdutoId] = useState({});
  const [loading, setLoading] = useState(true);
  const [quantidade, setQuantidade] = useState("1");
  

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        setProdutoId(res.data);
        setLoading(false);
      })
      .catch((erro) => {
        alert("Erro ao buscar o produto!");
        setLoading(false);
      });
  }, [id]);

  const handleAdicionarAoCarrinho = () => {
    const quantidadeSelecionada = Number(quantidade);

    // Verifica se o produto já está no carrinho
    const indexExistente = carrinhoAnterior.findIndex(
      (item) => item.produto.id === produtoId.id
    );

    let carrinhoAtualizado;

    if (indexExistente !== -1) {
      // Produto já existe, atualiza a quantidade e total
      const itemExistente = carrinhoAnterior[indexExistente];
      const novaQuantidade = itemExistente.quantidade + quantidadeSelecionada;

      const itemAtualizado = {
        ...itemExistente,
        quantidade: novaQuantidade,
        total: produtoId.price * novaQuantidade,
      };

      // Substitui o item antigo pelo novo na mesma posição
      carrinhoAtualizado = [...carrinhoAnterior];
      carrinhoAtualizado[indexExistente] = itemAtualizado;
    } else {
      // Produto não está no carrinho, adiciona novo
      const novoItem = {
        produto: produtoId,
        quantidade: quantidadeSelecionada,
        total: produtoId.price * quantidadeSelecionada,
      };
      carrinhoAtualizado = [...carrinhoAnterior, novoItem];
    }

    // Navega para o carrinho com a lista atualizada
   adicionarAoCarrinho(produtoId, Number(quantidade));
navigation.navigate("Carrinho"); // <- sem passar params;
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <ScrollView>
      <View>
        <Card>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ImagemCompleta", {
                imageUrl: produtoId.image,
              })
            }
          >
            <Card.Cover
              source={{ uri: produtoId.image }}
              style={{ width: "100%", height: 200 }}
            />
          </TouchableOpacity>
          <Card.Title
            title={produtoId.title}
            subtitle={`Valor: ${produtoId.price}`}
          />
        </Card>

        <Card>
          <Card.Content>
            <Text>Descrição: {produtoId.description}</Text>
            <Text>Categoria: {produtoId.category}</Text>

            <Text style={{ marginTop: 10 }}>Quantidade desejada:</Text>
            <TextInput
              style={styles.input}
              value={quantidade}
              onChangeText={setQuantidade}
              keyboardType="numeric"
            />

            <Button
              mode="contained"
              style={{ marginTop: 16 }}
              onPress={handleAdicionarAoCarrinho}
            >
              Adicionar ao Carrinho
            </Button>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
  },
});
