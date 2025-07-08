import api from "./api"

export const buscarMovimentacao = () => {
    try {
        const response = api.get("movimentacoes");
        return response;
    }catch (e){
        console.error("Ocorreu um erro:", e);
        throw e;
    }
}

export const CriarMovimentacao = (data) => {
    try {
        const response = api.post("movimentacoes", data);
        return response.status;
    } catch (e){
        console.error("Erro ao tentar criar uma movitentação: ", e);
    }
}