import React from "react"

import {createStackNavigator} from "@react-navigation/stack"

import Home from "../screens/HomeScreen"
import TabRoutes from "./TabRoutes";
import ImagemCompletaScreen from "../screens/ImagemCompletaScreen";
import ProdutoScreen from "../screens/ProdutoScreen";
import CarrinhoScreen from "../screens/CarrinhoScreen";
import CadastroLista from "../screens/CadastroLista";
import CadastroScreen from "../screens/CadastroScreen";
import MeuCadastro from "../screens/MeuCadastro";


const Stack = createStackNavigator ();


export default function StackRoutes() {
  return (
  <Stack.Navigator>
    <Stack.Screen 
    name="TabRoutes"
    component={TabRoutes}
    options={{
            title: "Minha Loja",
            headerTitleAlign: 'center'
        }}
    
    />

    <Stack.Screen 
    name="ProdutoScreen"
    component={ProdutoScreen}
    options={{
      title: 'Produto',
      headerTitleAlign: 'center'
    }}
    />

    <Stack.Screen 
    name="ImagemCompleta" 
    component={ImagemCompletaScreen} 
    options={{ headerShown: false }} 
  />

  <Stack.Screen 
  name="Carrinho" 
  component={CarrinhoScreen} 
  
  />

  <Stack.Screen 
  name="CadastroLista"
  component={CadastroLista}
  />

  

  <Stack.Screen 
  name="CadastroScreen"
  component={CadastroScreen}
  />

  <Stack.Screen 
  name="MeuCadastro"
  component={MeuCadastro}
  />

  




  </Stack.Navigator>
  )
}

