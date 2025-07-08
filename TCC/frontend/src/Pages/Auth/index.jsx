import React, { useState } from "react";
import styled, { css } from "styled-components";
import bgImage from "../../Assets/SVGs/Background/background-login-cadastro.svg";
import CardLogin from "../../Components/Cards/CardLogin";
import CardCadastro from "../../Components/Cards/CardCadastro";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
`;

const CardContainer = styled.div`
  position: relative;
  width: 350px;
  min-height: 480px;
  height: fit-content;
`;

const AnimatedCard = styled.div`
  position: absolute;
  width: 100%;
  height: 582px;
  transition: 
    opacity 0.5s cubic-bezier(.68,-0.55,.27,1.55),
    transform 0.5s cubic-bezier(.68,-0.55,.27,1.55);
  ${(props) =>
    props.show
      ? css`
          opacity: 1;
          transform: translateY(0) scale(1);
          z-index: 2;
          pointer-events: all;
        `
      : css`
          opacity: 0;
          transform: translateY(40px) scale(0.95);
          z-index: 1;
          pointer-events: none;
        `}
`;

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Wrapper>
      <CardContainer>
        <AnimatedCard show={isLogin}>
          <CardLogin onSwitch={() => setIsLogin(false)} />
        </AnimatedCard>
        <AnimatedCard show={!isLogin}>
          <CardCadastro onSwitch={() => setIsLogin(true)} />
        </AnimatedCard>
      </CardContainer>
    </Wrapper>
  );
};

export default Auth;