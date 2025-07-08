import { Outlet } from "react-router-dom";
import NavBar from "../../Components/Navs/NavBar";
import Subnav from "../../Components/Navs/Subnav";
import styled from "styled-components";

const Config = () => {
    return (
        <>
            <NavBar/>
            <Wrapper>
                <Outlet/>
            </Wrapper>
            <Subnav/>
        </>
    )
}


const Wrapper = styled.div`
    background-color: #1a1a1a;
    height: 100%;
`

export default Config;