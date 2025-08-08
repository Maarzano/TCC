import { useState, useCallback } from "react";
import { enviarEmailRecuperacaoSenha } from "../../Services/usuarioService";

export const useRecuperarSenha = () => {
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState(null);
    const [sucesso, setSucesso] = useState(false);

    const recuperar = useCallback(async (email) => {
        setLoading(true);
        setErro(null);
        setSucesso(false);
        try {
            await enviarEmailRecuperacaoSenha(email);
            setSucesso(true);
        } catch (e) {
            setErro(typeof e === "string" ? e : "Erro ao enviar e-mail de recuperação");
        } finally {
            setLoading(false);
        }
    }, []);

    return { recuperar, loading, erro, sucesso };
};
