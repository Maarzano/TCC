import styled from "styled-components";
import Modal from "..";
import { useEffect, useMemo } from "react";

const ConfirmActionModal = ({ isOpen, onClose, type = 'save', onConfirm, data }) => {
  const { title, confirmColor, confirmLabel, p } = useMemo(() => {
    switch (type) {
      case "save":
        return {
          title: "Deseja salvar as alterações?",
          confirmColor: "#623bda",
          confirmLabel: "Salvar",
        };
      case "edit":
        return {
          title: "Deseja editar este registro?",
          confirmColor: "#0074e4",
          confirmLabel: "Editar",
          p: "editar"
        };
      case "delete":
        return {
          title: "Tem certeza que deseja excluir?",
          confirmColor: "#b31414",
          confirmLabel: "Excluir",
          p: "excluir"
        };
      case "remove":
        return {
          title: "Tem certeza que deseja remover?",
          confirmColor: "#b31414",
          confirmLabel: "Remover",
          p: "remover"
        };
      case "clear":  
        return {
          title: "Tem certeza que deseja limpar?",
          confirmColor: "#b31414",
          confirmLabel: "Limpar",
          p: "limpar"
        };
      case "cancel":
        return {
          title: "Cancelar ação?",
          confirmColor: "#444",
          confirmLabel: "Cancelar",
        };
      default:
        return {
          title: "Confirmar ação?",
          confirmColor: "#ff0000",
          confirmLabel: "Confirmar",
        };
    }
  }, [type]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Container>
        <h2>{title}</h2>
        <p>
          {data?.nomeFuncionario || data?.nomeItem
            ? `Realmente deseja ${p} ${data?.nomeFuncionario || data?.nomeItem}? `
            : null}
          Esta ação não poderá ser desfeita.
        </p>
        <ButtonRow $confirmColor={confirmColor}>
          <button onClick={onClose}>Voltar</button>
          <button onClick={() => onConfirm?.()}>
            {confirmLabel}
          </button>
        </ButtonRow>
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  background: #1e1e1e;
  color: white;
  padding: 30px;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  min-width: 384px;
  min-height: 200px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
  font-family: 'Segoe UI', sans-serif;

  h2 {
    margin-bottom: 10px;
    font-size: 22px;
    color: #ffffff;
  }

  p {
    font-size: 14px;
    opacity: 0.7;
    margin-bottom: 25px;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 10px;

  button {
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 18px;
    cursor: pointer;
    color: white;
    transition: background-color 0.3s;

    &:first-child {
      background-color: #333;
    }

    &:last-child {
      background-color: ${(props) => props.$confirmColor};
    }

    &:hover {
      opacity: 0.85;
    }
  }
`;

export default ConfirmActionModal;
