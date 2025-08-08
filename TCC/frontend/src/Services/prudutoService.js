import api from "./api";

export const buscarProdutos = async () => {
  try {
    const response = await api.get("/Items");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
}

export const buscarProdutoPorId = async (itemId) => {
  try {
    const response = await api.get(`/Items/${itemId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    throw error;
  }
}

export const criarProduto = async (info) => {
  try {
    const response = await api.post("/Items", info);
    return response;
  } catch (e){
    console.error(e);
    throw e;
  }
}

export const deletarProdutoPorId = async (itemId) => {
  try {
    const response = await api.delete(`/Items/${itemId}`);
    return response;
  } catch (e) {
    console.error("Erro ao deletar produto:", e);
    throw e;
  }
};

export const editarProdutoPorId = async (itemId, info) => {
  try {
    const response = await api.put(`/Items/${itemId}`, info);
    return response;
  } catch (e) {
    console.error("Erro ao editar produto:", e);
    throw e;
  }
};

export const atualizarQuantidadeProduto = async (itemId, novaQuantidade) => {
  try {
    // Primeiro busca o produto atual
    const produtoAtual = await buscarProdutoPorId(itemId);
    
    // Atualiza apenas a quantidade
    const produtoAtualizado = {
      ...produtoAtual,
      quantidade: novaQuantidade
    };
    
    const response = await api.put(`/Items/${itemId}`, produtoAtualizado);
    return response;
  } catch (e) {
    console.error("Erro ao atualizar quantidade do produto:", e);
    throw e;
  }
};