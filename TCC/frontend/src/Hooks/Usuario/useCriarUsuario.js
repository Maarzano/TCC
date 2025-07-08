import { useState, useCallback } from "react"
import { criarUsuario } from "../../Services/usuarioService";

export const useCriarUsuario = () => {
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState(null);
    const [sucesso, setSucesso] = useState(false);
    const [dadosRetornados, setDadosRetornados] = useState(null);

    const criar = useCallback(async (info) => {
        setLoading(true);
        setErro(null);
        setSucesso(false);
        setDadosRetornados(null);

        try {
            const resultado = await criarUsuario(info);
            setSucesso(true);
            setDadosRetornados(resultado);
        } catch (e){
            setErro(e.response?.data?.mensagem || e.message || "Erro ao criar usuário");
        } finally {
            setLoading(false);
        }
    }, []);
    return { criar, loading, erro, sucesso, dadosRetornados };
};

/* TODO - Melhorar tratamento de erros no geral, 
o hook que tem que tratar erros enviadas da 
API com códigos 400, 500 etc */