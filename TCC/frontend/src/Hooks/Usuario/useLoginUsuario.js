import { useState } from "react"
import { logarUsuario } from "../../Services/usuarioService";

export const useLoginUsuario = () => {
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState(null);
    const [sucesso, setSucesso] = useState(false);
    const [dataRecebido, setDataRecebido] = useState(null);

    const login = async (info) => {
        setLoading(true);
        setErro(null);
        setSucesso(false);
        setDataRecebido(null);

        try{
            const response = await logarUsuario(info);
            setDataRecebido(response.data);
            setSucesso(true);
        } catch (e) {
            console.error(e);
            setErro(e);
        } finally {
            setLoading(false);
        };

        
    };
    return { login, loading, erro, sucesso, dataRecebido };
};

/* TODO - Melhorar tratamento de erros no geral, 
o hook que tem que tratar erros enviadas da 
API com códigos 400, 500 etc */