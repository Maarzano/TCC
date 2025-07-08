import { useState } from "react";
import styled from "styled-components";
import NavBar from "../../Components/Navs/NavBar";
import Subnav from "../../Components/Navs/Subnav";
import BackButton from "../../Components/Carting/BackButton";
import ActionButtons from "../../Components/Carting/ActionButtons";
import CartItemList from "../../Components/Carting/CartItemList";
import Search2 from "../../Components/Searchs/Search2/index.jsx";
import ClearButton from "../../Components/Carting/ClearButton/index.jsx";

const Wrapper = styled.div`
    background-color: #1a1a1a;
`;

const Content = styled.div`
    margin: 77px auto 0px auto;
    padding: 30px;
    max-width: 1650px;
    color: wheat;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`;

const Cart = () => {
    const [searchTerm, setSearchTerm] = useState("");
    return (
        <Wrapper>
            <NavBar />
            <Content>
                <Header>
                    <BackButton />
                    <h1>Carrinho</h1>
                    <ClearButton />
                </Header>
                <Search2
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Pesquisar item no carrinho..."
                />
                <CartItemList searchTerm={searchTerm} />
                <ActionButtons  />
            </Content>
            <Subnav />
        </Wrapper>
    );
};

export default Cart;