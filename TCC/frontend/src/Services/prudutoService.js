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