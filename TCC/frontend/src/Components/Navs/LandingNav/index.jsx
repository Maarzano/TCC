import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import stockIcon from "../../../Assets/SVGs/Icons/stock-svgrepo-com.png";
import inoDevIcon from "../../../Assets/SVGs/Icons/InoDev.png";

const LandingNav = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGetStarted = () => {
    navigate("/auth");
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <Nav isScrolled={isScrolled}>
      <NavContainer>
        <Logo>
          <LogoIcon src={inoDevIcon} alt="Logo InoDev" />
          <LogoSeparator />
          <LogoIcon src={stockIcon} alt="Logo Stockfy" />
          <LogoText>Stockfy</LogoText>
        </Logo>

        <DesktopMenu>
          <NavLink onClick={() => scrollToSection("features")}>Funcionalidades</NavLink>
          <NavLink onClick={() => scrollToSection("comentarios")}>Comentários</NavLink>
          <NavLink onClick={() => scrollToSection("benefits")}>Benefícios</NavLink>
          <NavLink onClick={() => scrollToSection("contact")}>Contato</NavLink>
          <LoginButton onClick={handleGetStarted}>Entrar</LoginButton>
        </DesktopMenu>

        <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <MenuIcon isOpen={isMobileMenuOpen}>
            <span></span>
            <span></span>
            <span></span>
          </MenuIcon>
        </MobileMenuButton>

        <MobileMenu isOpen={isMobileMenuOpen}>
          <MobileNavLink onClick={() => scrollToSection("features")}>Funcionalidades</MobileNavLink>
          <MobileNavLink onClick={() => scrollToSection("benefits")}>Benefícios</MobileNavLink>
          <MobileNavLink onClick={() => scrollToSection("comentarios")}>Comentários</MobileNavLink>
          <MobileNavLink onClick={() => scrollToSection("contact")}>Contato</MobileNavLink>
          <MobileLoginButton onClick={handleGetStarted}>Entrar</MobileLoginButton>
        </MobileMenu>
      </NavContainer>
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: ${props => props.isScrolled ? '20px' : '0'};
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${props => props.isScrolled ? 'rgba(26, 26, 26, 0.95)' : 'rgba(26, 26, 26, 0.1)'};
  backdrop-filter: ${props => props.isScrolled ? 'blur(15px)' : 'blur(5px)'};
  border-radius: ${props => props.isScrolled ? '15px' : '0'};
  margin: ${props => props.isScrolled ? '0 20px' : '0'};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  padding: ${props => props.isScrolled ? '15px 0' : '20px 0'};
  box-shadow: ${props => props.isScrolled ? '0 8px 32px rgba(0, 0, 0, 0.3)' : '0 2px 10px rgba(0, 0, 0, 0.1)'};
  border: ${props => props.isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.05)'};
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LogoIcon = styled.img`
  width: 35px;
  height: 35px;
`;

const LogoText = styled.h1`
  font-size: 24px;
  font-weight: bold;
  background: linear-gradient(45deg, #7c5cff, #a084ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const DesktopMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #7c5cff;
  }
`;

const LoginButton = styled.button`
  padding: 10px 20px;
  border: 2px solid #7c5cff;
  background: transparent;
  color: #7c5cff;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #7c5cff;
    color: white;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const LogoSeparator = styled.div`
  width: 22px;
  height: 32px;
  margin: 0 3px 0 2px;
  position: relative;
  display: flex;
  align-items: center;
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    width: 0;
    height: 100%;
    border-left: 2px solid #a084ff;
    transform: skew(-25deg);
    opacity: 0.7;
  }
`;

const MenuIcon = styled.div`
  width: 25px;
  height: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  span {
    width: 100%;
    height: 2px;
    background: white;
    transition: all 0.3s ease;
    transform-origin: center;

    &:nth-child(1) {
      transform: ${props => props.isOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none'};
    }

    &:nth-child(2) {
      opacity: ${props => props.isOpen ? '0' : '1'};
    }

    &:nth-child(3) {
      transform: ${props => props.isOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none'};
    }
  }
`;

const MobileMenu = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(15px);
  flex-direction: column;
  padding: 20px;
  gap: 15px;
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-100%)'};
  opacity: ${props => props.isOpen ? '1' : '0'};
  transition: all 0.3s ease;
  border-radius: 0 0 15px 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-top: none;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileNavLink = styled.a`
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 10px 0;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #7c5cff;
  }
`;

const MobileLoginButton = styled.button`
  padding: 12px 20px;
  border: 2px solid #7c5cff;
  background: transparent;
  color: #7c5cff;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;

  &:hover {
    background: #7c5cff;
    color: white;
  }
`;

export default LandingNav; 