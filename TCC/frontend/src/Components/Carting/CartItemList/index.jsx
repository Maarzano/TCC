import React, { useState } from "react";
import styled from "styled-components";
import CloseIcon from "../../../Assets/SVGs/Icons/icon-x-close-black.svg";
import { useCart } from "../../../Context/Cart";
import ConfirmActionModal from "../../Modal/ConfirmActionModal";

const CartItemList = ({ searchTerm, onActionConfirmed }) => {
  const { cartItems, removeItemFromCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handlerOnClick = (e, itemId) => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedItemId(itemId); 
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItemId(null); 
  };

  const filteredItems = cartItems.filter((item) =>
    item.nomeItem.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <List>
        {filteredItems.map((item) => (
          <Item key={item.itemId}>
            <Image />
            <Info>
              <Nome>{item.nomeItem}</Nome>
              <Quantidade>Quantidade: {item.quantity}</Quantidade>
            </Info>

            <DeleteButton onClick={(e) => handlerOnClick(e, item.itemId)}>
              <img src={CloseIcon} alt="Excluir" />
            </DeleteButton>
          </Item>
        ))}
      </List>

      <ConfirmActionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={() => {
          if (selectedItemId) {
            removeItemFromCart(selectedItemId);
          }
          handleCloseModal();
          if (onActionConfirmed) onActionConfirmed(); 
        }}
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
`;

const Image = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #b0b0b0;
  background-image: linear-gradient(
    45deg,
    #aaa 25%,
    transparent 25%,
    transparent 50%,
    #aaa 50%,
    #aaa 75%,
    transparent 75%
  );
  background-size: 20px 20px;
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
    filter: brightness(0) saturate(100%) invert(21%) sepia(94%)
      saturate(7456%) hue-rotate(357deg) brightness(91%) contrast(119%);
  }
`;
