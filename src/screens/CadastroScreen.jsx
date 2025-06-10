import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import { Button, Text, TextInput } from 'react-native-paper'
import CadastroService from '../contexts/CadastroService'
import HomeScreen from './HomeScreen'

export default function CadastroScreen({ navigation, route }) {

  const cadastroAntigo = route.params || {}

  const [nome, setNome] = useState(cadastroAntigo.nome || "")
  const [cpf, setCpf] = useState(cadastroAntigo.cpf || "")
  const [email, setEmail] = useState(cadastroAntigo.email || "")
  const [telefone, setTelefone] = useState(cadastroAntigo.telefone || "")
  const [dataNascimento, setDataNascimento] = useState(cadastroAntigo.dataNascimento || "")

  async function salvar() {
    let cadastro = {
      nome,
      cpf,
      email,
      telefone,
      dataNascimento
    }

    if (!cadastro.nome || !cadastro.cpf || !cadastro.email || !cadastro.dataNascimento || !cadastro.telefone) {
      alert('Preencha todos os campos!')
      return
    }

    if(cadastroAntigo.id){
      
      cadastro.id = cadastroAntigo.id
      await CadastroService.atualizar(cadastro)
      alert("Cadastro alterado com sucesso!!!")
      navigation.reset({
        index: 0,
        routes: [{ name: 'CadastroLista' }]
      })
    } else {
     
      await CadastroService.salvar(cadastro)
      alert(" Cadastrado com sucesso!!!")
      navigation.reset({
        index: 0,
        routes: [{ name: 'TabRoutes' , params: { HomeScreen }}]
      })
    }

  }

  return (
    <View style={styles.container}>
      <Text variant='titleLarge'>Informe os dados do cadastro:</Text>

      <Text variant='titleLarge'>ID cadastro: {cadastroAntigo.id || 'NOVO'}</Text>

      <TextInput
        style={styles.input}
        mode='outlined'
        label="Nome"
        placeholder='Informe o nome'
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        mode='outlined'
        label="CPF"
        placeholder='Informe o CPF'
        value={cpf}
        onChangeText={setCpf}
        keyboardType='decimal-pad'
        render={(props) => (
          <TextInputMask
            {...props}
            type={'cpf'}
          />
        )}
      />

      <TextInput
        style={styles.input}
        mode='outlined'
        label="E-mail"
        placeholder='Informe o E-mail'
        value={email}
        onChangeText={setEmail}
        keyboardType='email-address'
      />

      <TextInput
        style={styles.input}
        mode='outlined'
        label="Telefone"
        placeholder='Informe o Telefone'
        value={telefone}
        onChangeText={setTelefone}
        keyboardType='numeric'
        render={(props) => (
          <TextInputMask
            {...props}
            type={'cel-phone'}
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99)'
            }}
          />
        )}
      />

      <TextInput
        style={styles.input}
        mode='outlined'
        label="Data de Nascimento"
        placeholder='Informe a Data'
        value={dataNascimento}
        onChangeText={setDataNascimento}
        keyboardType='numeric'
        render={(props) => (
          <TextInputMask
            {...props}
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY'
            }}
          />
        )}
      />

      <Button
        style={styles.input}
        mode='contained'
        onPress={salvar}
      >
        Salvar
      </Button>


    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10
  },
  input: {
    width: '90%',
    marginTop: 10
  }
})