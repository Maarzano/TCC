import api from "./api";

export const buscarUsuarios = async () => {
    try {
        const response = await api.get("/Usuarios");
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar usuarios:", error);
        throw error;
    }
}

export const criarUsuario = async (info) => {
    try {
        const response = await api.post("/Usuarios", info);
        return response;
    } catch(e){
        console.error("Erro ao criar usuario", e);
        throw e;
    }
}

export const logarUsuario = async (info) => {
    try {
        const response = await api.post("/auth/login", info);
        const { token, usuario } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("usuario", JSON.stringify(usuario));
        return token;
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const atualizarUsuario = async (userId, info) => {
    try {
        const response = await api.put(`/Usuarios/${userId}`, info);
        return response;
    } catch (e) {
        console.error("Erro ao atualizar usuario", e);
        throw e;
    }
};

export const enviarEmailRecuperacaoSenha = async (email) => {
    try {
        const response = await api.post(`/Usuarios/esqueci-senha?email=${encodeURIComponent(email)}`);
        return response.data;
    } catch (e) {
        if (e.response && e.response.status && e.response.status >= 400) {
            // Se o backend retornar string, garanta que é string
            throw typeof e.response.data === "string" ? e.response.data : "Erro ao enviar e-mail de recuperação";
        }
        throw "Erro ao enviar e-mail de recuperação";
    }
};

