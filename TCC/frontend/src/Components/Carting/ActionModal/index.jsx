import styled from "styled-components";
import { useState, useEffect } from "react";

const Overlay = styled.div`
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const Container = styled.div`
    background: #2e2e2e;
    color: white;
    padding: 30px;
    border-radius: 12px;
    width: 350px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);

    select {
        margin-top: 15px;
        padding: 10px;
        width: 100%;
        border-radius: 8px;
        border: none;
        font-size: 16px;
        margin-bottom: 20px;
        background-color: #444;
        color: white;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        cursor: pointer;
    }

    h2 {
        margin-bottom: 10px;
    }

    p {
        font-size: 14px;
        opacity: 0.8;
    }
`;

const ButtonRow = styled.div`
    display: flex;
    justify-content: space-between;

    button {
        padding: 10px 18px;
        border: none;
        border-radius: 8px;
        font-weight: bold;
        cursor: pointer;
        color: white;

        &:first-child {
            background-color: #555;
        }

        &:last-child {
            background-color: #6b4eff;
        }

        &:hover {
            opacity: 0.9;
        }
    }
`;

const ActionModal = ({ isOpen, onClose, onConfirm, tipo, funcionarios = [] }) => {
    const [responsavel, setResponsavel] = useState("");

    useEffect(() => {
        if (isOpen) {
            setResponsavel("");
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <Overlay onClick={onClose}>
            <Container onClick={(e) => e.stopPropagation()}>
                <h2>{tipo} de Itens</h2>
                <p>Selecione o responsável pela {tipo.toLowerCase()}:</p>

                <select
                    value={responsavel}
                    onChange={(e) => setResponsavel(e.target.value)}
                >
                    <option value="">Selecione um funcionário</option>
                    {funcionarios.map((func) => (
                        <option key={func.funcionarioId} value={func.nomeFuncionario}>
                            {func.nomeFuncionario}
                        </option>
                    ))}
                </select>

                <ButtonRow>
                    <button onClick={onClose}>Cancelar</button>
                    <button
                        onClick={() => {
                            if (responsavel.trim()) {
                                onConfirm(responsavel);
                                setResponsavel("");
                            } else {
                                alert("Por favor, selecione um responsável.");
                            }
                        }}
                    >
                        Confirmar
                    </button>
                </ButtonRow>
            </Container>
        </Overlay>
    );
};

export default ActionModal;
