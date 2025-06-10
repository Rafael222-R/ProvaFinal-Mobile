import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import HomeScreen from "../screens/HomeScreen";
import ProdutoScreen from "../screens/ProdutoScreen";
import CarrinhoScreen from "../screens/CarrinhoScreen";
import CadastroScreen from "../screens/CadastroScreen";
import CadastroLista from '../screens/CadastroLista'
import LoginScreen from "../screens/LoginScreen";
import MeuCadastro from "../screens/MeuCadastro";
import {useAuth} from '../contexts/AuthContext'


const Tab = createBottomTabNavigator();

export default function TabRoutes({route}) {

 const { usuario } = useAuth();



  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Catálogo",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="CarrinhoScreen"
        component={CarrinhoScreen}
        options={{
          title: "Carrinho",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" color={color} size={size} />
          ),
        }}
      />

     
{usuario && (
  <Tab.Screen
    name="MeuCadastro"
    component={MeuCadastro}
    options={{
      title: "Meu Cadastro",
      headerTitleAlign: "center",
      tabBarIcon: ({ color, size }) => (
        <MaterialIcons name="person" color={color} size={size} />
      ),
    }}
  />
)}


      {!usuario && (
        <Tab.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            title: "Login",
            headerTitleAlign: "center",
            tabBarIcon: ({ color, size }) => (
              <Entypo name="login" color={color} size={size} />
            ),
          }}
        />
      )}

    

    
    </Tab.Navigator>
  );
}
