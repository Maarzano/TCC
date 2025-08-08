import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NotFound = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <Wrapper>
            <LogoContainer>
                <LogoImage src="/inodev.png" alt="Inodev" />
                <VerticalLine />
                <LogoImage src="/stock-svgrepo-com.png" alt="Stock" />
            </LogoContainer>
            <Content>
                <ErrorContainer>
                    <ErrorCode>404</ErrorCode>
                    <ErrorMessage>Página não encontrada</ErrorMessage>
                    <ErrorDescription>
                        A página que você está procurando não existe ou foi movida.
                    </ErrorDescription>
                    <ButtonContainer>
                        <BackButton onClick={handleGoBack}>
                            Voltar
                        </BackButton>
                        <HomeButton onClick={handleGoHome}>
                            Ir para Home
                        </HomeButton>
                    </ButtonContainer>
                </ErrorContainer>
            </Content>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    background-color: #1a1a1a;
    min-height: 100vh;
    overflow: hidden;
    position: relative;
`;

const LogoContainer = styled.div`
    position: absolute;
    top: 20px;
    left: 20px;
    display: flex;
    align-items: center;
    gap: 15px;
    z-index: 10;
`;

const LogoImage = styled.img`
    height: 40px;
    width: auto;
    object-fit: contain;
`;

const VerticalLine = styled.div`
    width: 2px;
    height: 40px;
    background-color: #623bda;
    border-radius: 1px;
`;

const Content = styled.div`
    margin: 77px auto 0px auto;
    padding: 30px;
    max-width: 1650px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 70vh;
`;

const ErrorContainer = styled.div`
    text-align: center;
    color: wheat;
    max-width: 600px;
`;

const ErrorCode = styled.h1`
    font-size: 8rem;
    font-weight: bold;
    color: #623bda;
    margin: 0;
    text-shadow: 0 0 20px rgba(98, 59, 218, 0.5);
    animation: pulse 2s infinite;
    
    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.7;
        }
    }
`;

const ErrorMessage = styled.h2`
    font-size: 2.5rem;
    margin: 20px 0;
    color: #ffffff;
`;

const ErrorDescription = styled.p`
    font-size: 1.2rem;
    color: #cccccc;
    margin-bottom: 40px;
    line-height: 1.6;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
`;

const Button = styled.button`
    padding: 12px 30px;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }
    
    &:active {
        transform: translateY(0);
    }
`;

const BackButton = styled(Button)`
    background-color: #623bda;
    color: white;
    
    &:hover {
        background-color: #7c4dff;
        box-shadow: 0 5px 15px rgba(98, 59, 218, 0.4);
    }
`;

const HomeButton = styled(Button)`
    background-color: transparent;
    color: #623bda;
    border: 2px solid #623bda;
    
    &:hover {
        background-color: #623bda;
        color: white;
        box-shadow: 0 5px 15px rgba(98, 59, 218, 0.4);
    }
`;

export default NotFound;