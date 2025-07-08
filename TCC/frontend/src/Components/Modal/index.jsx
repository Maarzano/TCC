import React from 'react';
import styled from 'styled-components';
import ReactDOM from "react-dom"

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      e.stopPropagation();
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        {onClose && (
          <CloseButton onClick={onClose} aria-label="Fechar modal">&times;</CloseButton>
        )}
        {children}
      </ModalContainer>
    </ModalOverlay>,
    document.body
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s;
  position: relative;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 14px;
  right: 18px;
  background: transparent;
  border: none;
  color: #333;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  z-index: 2;
  line-height: 1;
  padding: 0;
  transition: color 0.2s;
  &:hover {
    color: #ff5a5a;
  }
`;

export default Modal;
