// src/contexts/AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarUsuario() {
      const json = await AsyncStorage.getItem('@usuarioLogado');
      if (json) {
        setUsuario(JSON.parse(json));
      }
      setCarregando(false);
    }

    carregarUsuario();
  }, []);

  const login = async (usuario) => {
    await AsyncStorage.setItem('@usuarioLogado', JSON.stringify(usuario));
    setUsuario(usuario);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('@usuarioLogado');
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, carregando }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
