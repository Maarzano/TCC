import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as CloudIcon } from "../../../Assets/SVGs/Icons/icon-cloud.svg";
import { ReactComponent as CloseIcon } from "../../../Assets/SVGs/Icons/icon-x-close-black.svg";
import { ReactComponent as EditIcon } from "../../../Assets/SVGs/Icons/edit.svg";
import { ReactComponent as Trash } from "../../../Assets/SVGs/Icons/Trash.svg";
import ConfirmActionModal from '../../Modal/ConfirmActionModal';

const SaveCancelBTN = ({ type = "save", data, onConfirm }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlerOnClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmAction = async () => {
    try {
      if (onConfirm) {
        await onConfirm(data);
      } else {
        console.warn("Nenhuma funcao de onConfirm foi passada.");
      }
    } finally {
      setIsModalOpen(false);
    }
  };

  const { icon: ComponentIcon, text, color, hoverTransform } = useMemo(() => {
    let icon = undefined;
    let btnText = "";
    let btnColor = "";
    let btnHoverTransform = "";

    switch (type) {
      case "save":
        icon = <CloudIcon className='Icon' />;
        btnText = 'Salvar';
        btnColor = "#623bda";
        btnHoverTransform = "translateX(1.5em)";
        break;
      case "delete":
        icon = <Trash className='Icon' />;
        btnText = 'Excluir';
        btnColor = "#d32d2d";
        btnHoverTransform = "translateX(1.60em)";
        break;
      case "clear":
        icon = <Trash className='Icon' />;
        btnText = 'Limpar Carrinho';
        btnColor = "#514b4b79";
        btnHoverTransform = "translateX(3.23em)";
        break;
      case "edit":
        icon = <EditIcon className='Icon' />;
        btnText = 'Editar';
        btnColor = "#039dfc"; 
        btnHoverTransform = "translateX(1.30em)";
        break;
      case "cancel":
        icon = <CloseIcon className='Icon' />;
        btnText = 'Cancelar';
        btnColor = "#212121";
        btnHoverTransform = "translateX(2em)";
        break;
      default:
        icon = <CloudIcon className='Icon' />;
        btnText = 'Salvar';
        btnColor = "#623bda";
        btnHoverTransform = "translateX(1.5em)";
        break;
    }

    return { icon, text: btnText, color: btnColor, hoverTransform: btnHoverTransform };
  }, [type]);

  return (
    <>
      <StyledWrapper $type={type} $color={color} $hover={hoverTransform}>
        <button onClick={handlerOnClick}>
          <div className="svg-wrapper-1">
            <div className="svg-wrapper">
              {ComponentIcon}
            </div>
          </div>
          <span>{text}</span>
        </button>
      </StyledWrapper>

      <ConfirmActionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmAction}
        type={type}
        data={data}
      />
    </>
  );
};

const StyledWrapper = styled.div`
  button {
    font-family: inherit;
    font-size: 20px;
    background: ${props => props.$color};
    color: white;
    fill: rgb(155, 153, 153);
    padding: 0.7em 1em;
    padding-left: 0.9em;
    display: flex;
    align-items: center;
    cursor: pointer;
    border: none;
    border-radius: 15px;
    font-weight: 1000;
    overflow: hidden;
  }

  .Icon {
    width: 30px;
    height: 30px;
    transition: transform 0.3s ease-in-out, fill 0.3s ease-in-out;
  }

  .svg-wrapper-1,
  .svg-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button span {
    display: block;
    margin-left: 0.3em;
    transition: all 0.3s ease-in-out;
  }

  button:hover {
    background: #000;
  }

  button:hover .svg-wrapper {
    transform: scale(1.25);
    transition: 0.5s linear;
  }

  button:hover .Icon {
    transform: ${props => props.$hover} scale(1.1);
    fill: #fff;
  }

  button:hover span {
    opacity: 0;
    transition: 0.5s linear;
  }

  button:active {
    transform: scale(0.95);
  }
`;

export default SaveCancelBTN;
