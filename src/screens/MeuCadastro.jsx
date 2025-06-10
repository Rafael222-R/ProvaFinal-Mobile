// src/screens/MeuCadastro.jsx
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import CadastroService from '../contexts/CadastroService';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function MeuCadastro() {
  const { usuario, logout } = useAuth();
  
  const [cadastro, setCadastro] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    async function carregar() {
      if (usuario?.id) {
        const dados = await CadastroService.buscar(usuario.id);
        setCadastro(dados);
      }
    }
    carregar();
  }, [usuario]);

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
            onPress={() =>
              navigation.navigate('CadastroScreen', { ...cadastro })
            }
          >
            Editar
          </Button>

          <Button
            icon="logout"
            mode="outlined"
            onPress={async () => {
              await logout();
              navigation.reset({
                index: 0,
                routes: [{ name: 'HomeScreen' }],
              });
            }}
            style={{ marginLeft: 10 }}
          >
            Sair
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}
