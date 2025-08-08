import React, { useState } from "react";
import styled from "styled-components";
import CloseIcon from "../../../Assets/SVGs/Icons/icon-x-close-black.svg";
import { useCart } from "../../../Context/Cart";
import ConfirmActionModal from "../../Modal/ConfirmActionModal";
import { placeholder } from "../../../Utils/verificandoImagem";

const CartItemList = ({ searchTerm, onActionConfirmed }) => {
  const { cartItems, removeItemFromCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleDeleteClick = (e, itemId) => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedItemId(itemId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItemId(null);
  };

  const handleConfirmRemove = () => {
    if (selectedItemId) {
      removeItemFromCart(selectedItemId);
    }
    handleCloseModal();
    if (onActionConfirmed) onActionConfirmed();
  };

  const filteredItems = cartItems.filter((item) =>
    item.nomeItem.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <List>
        {filteredItems.map((item) => (
          <Item key={item.itemId}>
            <ImageWrapper>
              <img
                src={placeholder(item.imagem)}
                alt={item.nomeItem}
                draggable={false}
              />
            </ImageWrapper>
            <Info>
              <Nome>{item.nomeItem}</Nome>
              <Quantidade>Quantidade: {item.quantity}</Quantidade>
            </Info>
            <DeleteButton onClick={(e) => handleDeleteClick(e, item.itemId)}>
              <img src={CloseIcon} alt="Excluir" />
            </DeleteButton>
          </Item>
        ))}
      </List>

      <ConfirmActionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmRemove}
        type="remove"
      />
    </>
  );
};

export default CartItemList;

const List = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 20px 18px;
  border-radius: 15px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.015);
  }
`;

const ImageWrapper = styled.div`

  width: 60px;
  height: 60px;
  border-radius: 20%;
  background-color: transparent;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Info = styled.div`
  flex-grow: 1;
  margin-left: 20px;
`;

const Nome = styled.div`
  font-weight: bold;
  color: rgb(255, 255, 255);
`;

const Quantidade = styled.div`
  color: rgba(255, 255, 255, 0.35);
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }

  &:hover {
    filter: brightness(0) saturate(100%) invert(21%) sepia(94%) saturate(7456%)
      hue-rotate(357deg) brightness(91%) contrast(119%);
  }
`;
