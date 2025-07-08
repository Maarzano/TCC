import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ToolTipTab from '../../ToolTipTab';

const CreateBTN = () => {

    const location = useLocation();

    const isEmploye = location.pathname === "/Config/Employe";
  return (
    <StyledWrapper>
    <ToolTipTab label={`Adicionar ${ isEmploye ? "Funcionário" : "Item"}`}>
      <button tabIndex={0} className="plusButton">
        <svg className="plusIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
          <g mask="url(#mask0_21_345)">
            <path d="M13.75 23.75V16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75Z" />
          </g>
        </svg>
      </button>
      </ToolTipTab>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`

  .plusButton {
    /* Config start */
    --plus_sideLength: 3.5rem;
    --plus_topRightTriangleSideLength: 0.9rem;
    /* Config end */
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--plus_sideLength);
    height: var(--plus_sideLength);
    background-color: #252525;
    overflow: hidden;
    border-radius: 100%;
  }

  .plusButton::before {
    position: absolute;
    content: "";
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    border-width: 0 var(--plus_topRightTriangleSideLength) var(--plus_topRightTriangleSideLength) 0;
    border-style: solid;
    border-color: transparent transparent transparent transparent;
    transition-timing-function: ease-in-out;
    transition-duration: 0.2s;
  }

  .plusButton:hover {
    cursor: pointer;
    box-shadow: 0 0 10px #623bda;
  }

  .plusButton:hover::before {
    --plus_topRightTriangleSideLength: calc(var(--plus_sideLength) * 2);
  }

  .plusButton:focus-visible::before {
    --plus_topRightTriangleSideLength: calc(var(--plus_sideLength) * 2);
  }

  .plusButton>.plusIcon {
    fill: #623bda;
    width: calc(var(--plus_sideLength) * 0.7);
    height: calc(var(--plus_sideLength) * 0.7);
    z-index: 1;
    transition-timing-function: ease-in-out;
    transition-duration: 0.2s;
  }

  .plusButton:hover>.plusIcon {
    fill: white;
    transform: rotate(180deg);
  }

  .plusButton:focus-visible>.plusIcon {
    fill: #623bda;
    transform: rotate(180deg);
  }`;

export default CreateBTN;
