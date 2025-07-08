import React from 'react';
import styled from 'styled-components';

const ToolTipTab = ({ children, label, direction }) => {
  return (
    <TabWrapper direction={direction}>
      {children}
      <Tooltip>{label}</Tooltip>
    </TabWrapper>
  );
};

const TabWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover span {
    opacity: 1;
    transform: translateY(${props => props.direction === undefined ? "-10px" : props.direction});
  }
`;

const Tooltip = styled.span`
  position: absolute;
  bottom: 115%;
  background-color: #000000;
  color: #623bda;
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  transform: translateY(0);
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: none;
  z-index: 10;
`;

export default ToolTipTab;
