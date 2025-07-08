import { useEffect, useState } from "react";
import { buscarUsuarios } from "../../Services/usuarioService";


export const useUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);


    useEffect(() => {
        async function carregarDados() {
            try {

                const dados = await buscarUsuarios();
                setUsuarios(dados);
            } catch(e) {
                setErro(e.message);
            } finally {
                setLoading(false);
            }
        }
        carregarDados();
    }, []);
    return {usuarios, loading, erro};
}

/* TODO - Melhorar tratamento de erros no geral, 
o hook que tem que tratar erros enviadas da 
API com códigos 400, 500 etc */