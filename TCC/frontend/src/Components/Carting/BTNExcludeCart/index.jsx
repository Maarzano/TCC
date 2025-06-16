import { useCart } from "../../../Context/Cart";
import TrashIcon from "../../../Assets/SVGs/Icons/Trash.svg";
import styled from "styled-components";
import { useState } from "react";
import ConfirmActionModal from "../../Modal/ConfirmActionModal";

const BTNExcludeCart = ({type, item}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {cartItems, removeItemFromCart } = useCart();


    return (
        <>
        <DeleteButton type="delete" onClick={() => setIsModalOpen(true)}>
            <img src={TrashIcon} alt="Excluir" />
        </DeleteButton>
        <ConfirmActionModal 
        isOpen={isModalOpen}
        onClose={() => {setIsModalOpen(false)}}
        type={type}
        data={item  }
        />
        </>
    )
}

const DeleteButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;

    img {
        width: 24px;
        height: 24px;
`

export default BTNExcludeCart;