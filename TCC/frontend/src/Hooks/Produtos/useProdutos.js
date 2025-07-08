import { useEffect, useState } from "react"
import { buscarProdutos } from "../../Services/prudutoService";

export const useProdutos = () => {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);


    useEffect(() => {
        async function carregarDados() {
            try{
                //await new Promise(resolve => setTimeout(resolve, 2650));
                const dados = await buscarProdutos();
                setProdutos(dados);
            } catch (e){
                setErro(e.message);
            } finally {
                setLoading(false);
            }
        }
        carregarDados();
    }, []);
    return {produtos, loading, erro};
}

/* TODO - Melhorar tratamento de erros no geral, 
o hook que tem que tratar erros enviadas da 
API com códigos 400, 500 etc */