import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { List, Button, Card, Text } from 'react-native-paper';
import CadastroService from '../contexts/CadastroService';

export default function CadastroLista({ route, navigation }) {
  const [cadastro, setCadastro] = useState(null);
  const idUsuario = route?.params?.idUsuario;

  useEffect(() => {
    async function carregarDados() {
      if (idUsuario) {
        const usuario = await CadastroService.buscar(idUsuario);
        setCadastro(usuario);
      }
    }

    carregarDados();
  }, [idUsuario]);

  if (!cadastro) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Nenhum dado encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 10 }}>
      <Card>
        <Card.Title title="Seus dados" />
        <Card.Content>
          <Text>Nome: {cadastro.nome}</Text>
          <Text>Email: {cadastro.email}</Text>
          <Text>Telefone: {cadastro.telefone}</Text>
          <Text>CPF: {cadastro.cpf}</Text>
          <Text>Data de Nascimento: {cadastro.dataNascimento}</Text>
        </Card.Content>
        <Card.Actions>
          <Button
            icon="pencil"
            mode="contained"
           onPress={() => navigation.navigate('CadastroScreen', { ...cadastro })}

          >
            Editar
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}
