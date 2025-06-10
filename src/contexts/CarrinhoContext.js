import React, { createContext, useState, useContext } from "react";

// Criando o contexto
const CarrinhoContext = createContext();

// Provider para envolver seu app
export function CarrinhoProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);

  // Função para adicionar ao carrinho (exemplo)
  function adicionarAoCarrinho(produto, quantidade) {
    setCarrinho((oldCarrinho) => {
      const index = oldCarrinho.findIndex(
        (item) => item.produto.id === produto.id
      );

      if (index !== -1) {
        const novoCarrinho = [...oldCarrinho];
        const itemExistente = novoCarrinho[index];
        const novaQuantidade = itemExistente.quantidade + quantidade;

        novoCarrinho[index] = {
          ...itemExistente,
          quantidade: novaQuantidade,
          total: produto.price * novaQuantidade,
        };

        return novoCarrinho;
      } else {
        return [
          ...oldCarrinho,
          {
            produto,
            quantidade,
            total: produto.price * quantidade,
          },
        ];
      }
    });
  }

  return (
    <CarrinhoContext.Provider value={{ carrinho, adicionarAoCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  );
}

// Hook customizado para facilitar o uso do contexto
export function useCarrinho() {
  const context = useContext(CarrinhoContext);
  if (!context) {
    throw new Error("useCarrinho deve ser usado dentro de um CarrinhoProvider");
  }
  return context;
}
