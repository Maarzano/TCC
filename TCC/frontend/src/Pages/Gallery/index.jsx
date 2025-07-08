import styled from "styled-components";
import NavBar from "../../Components/Navs/NavBar"
import Subnav from "../../Components/Navs/Subnav";
import GalleryItenSection from "../../Components/GalleryItemSection";

const Gallery = () => {
    return (
        <Wrapper>
            <NavBar/>
            <GalleryItenSection/>
            <Subnav/>
        </Wrapper>
    )
}

export default Gallery;


const Wrapper = styled.div`
    background-color: #1a1a1a;
`