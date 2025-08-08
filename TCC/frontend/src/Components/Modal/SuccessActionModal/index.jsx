import React from "react";
import styled from "styled-components";
import Modal from "../index";

const SuccessActionModal = ({ isOpen, onClose, tipo }) => {
  if (!isOpen) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Container>
        <Title>Sucesso!</Title>
        <Message>
          {tipo === "SAIDA"
            ? "Itens retirados do estoque com sucesso."
            : "Itens devolvidos ao estoque com sucesso."}
        </Message>
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  background: #23232e;
  color: #fff;
  padding: 32px 24px;
  border-radius: 16px;
  min-width: 320px;
  text-align: center;
`;

const Title = styled.h2`
  color: #7f56da;
  margin-bottom: 12px;
`;

const Message = styled.p`
  font-size: 1.1rem;
  margin-bottom: 24px;
`;



export default SuccessActionModal;
