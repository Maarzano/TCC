import { useEffect, useState } from "react";
import styled from "styled-components";
import CardPerfil from "../../Cards/CardPerfil";
import Cart from "../../../Assets/SVGs/Icons/icon-cart-black.svg";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
    const [scrolled, setScrolled] = useState(false);
    const locate = useLocation();

    const locateNow = locate.pathname === "/Gallery";

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <Wrapper className={scrolled ? "scrolled" : ""}>
            <WrapperCart>
                <Link to="/Cart">
                    <CartImg src={ locateNow && (Cart)} />
                </Link>
            </WrapperCart>
            <Link to="/Gallery">
                <SystemName>Stockify</SystemName>
            </Link>
            <CardPerfil />
        </Wrapper>
    );
};

// Estilo base
const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 4vw;
    background-color: #623bda;
    width: 100%;
    position: fixed;
    top: 0;
    transition: 0.5s all ease;
    z-index: 1000;

    &.scrolled {
        top: 20px;
        border-radius: 20px;
        margin: 0px 50px 0px 50px;
        width: 95%;
    }
`;

const WrapperCart = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
`;

const CartImg = styled.img`
    width: 55px;
    margin-left: 85px;
    cursor: pointer;
`;

const SystemName = styled.h1`
    color: #FFF;
    font-size: 60px;
    height: 100px;
    cursor: pointer;
`;

export default NavBar;
