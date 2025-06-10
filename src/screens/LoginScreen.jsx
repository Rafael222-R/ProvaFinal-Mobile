import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Snackbar, Text } from "react-native-paper";
import { TextInputMask } from "react-native-masked-text";
import CadastroService from "../contexts/CadastroService";
import { useAuth } from "../contexts/AuthContext";

export default function LoginScreen({ navigation }) {
  const { login } = useAuth(); // <- CORRETO
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [visivel, setVisivel] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function fazerLogin() {
    if (!email || !senha) {
      setMensagem("Preencha todos os campos!");
      setVisivel(true);
      return;
    }

    setCarregando(true);

    try {
      const lista = await CadastroService.listar();
      const usuario = lista.find(
        (item) => item.email === email && item.telefone === senha
      );

      if (usuario) {
        await login(usuario); // <- Atualiza contexto e AsyncStorage
        setMensagem("Login realizado com sucesso!");
        setVisivel(true);
        navigation.reset({
          index: 0,
          routes: [{ name: "TabRoutes" }],
        });
      } else {
        setMensagem("Usuário ou senha inválidos!");
        setVisivel(true);
      }
    } catch (erro) {
      setMensagem("Erro ao verificar login");
      setVisivel(true);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={{ marginBottom: 16 }}>
        Entrar
      </Text>

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        label="Telefone (senha)"
        placeholder="Informe o Telefone"
        value={senha}
        onChangeText={setSenha}
        mode="outlined"
        keyboardType="phone-pad"
        secureTextEntry
        style={styles.input}
        render={(props) => (
          <TextInputMask
            {...props}
            type={"cel-phone"}
            options={{
              maskType: "BRL",
              withDDD: true,
              dddMask: "(99)",
            }}
          />
        )}
      />

      <Button
        mode="contained"
        onPress={fazerLogin}
        loading={carregando}
        disabled={carregando}
        style={{ marginTop: 16 }}
      >
        Entrar
      </Button>

      <Button
        onPress={() => navigation.navigate("CadastroScreen")}
        style={{ marginTop: 10 }}
      >
        Não tem conta? Cadastre-se
      </Button>

      <Snackbar
        visible={visivel}
        onDismiss={() => setVisivel(false)}
        duration={4000}
      >
        {mensagem}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  input: {
    marginBottom: 12,
  },
});
