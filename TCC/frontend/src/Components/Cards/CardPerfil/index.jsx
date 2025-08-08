import styled from "styled-components";
import LogoutBTN from "../../Buttons/LogoutBTN"
import profilePictureWhite from "../../../Assets/SVGs/Icons/icon-profile-white&purple.svg";
import { Link } from "react-router-dom";
import { placeholderProfile } from "../../../Utils/verificandoImagem";

const CardPerfil = () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    return (
        <Wrapper>
            <ProfileWrapper>
                <Link to={'/Config/Profile'}>
                    <ProfilePicture src={usuario.imagem ?  placeholderProfile(usuario.imagem) : profilePictureWhite}/>
                </Link>
                <ProfileName><Link to={"/Config/Profile"}>{usuario.nomeCompleto}</Link></ProfileName>
            </ProfileWrapper>
            <LogoutBTN/>
        </Wrapper>
    )
}

export default CardPerfil;


const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: right;
    align-items: center;
    width: fit-content;
    height: 85%;
    background-color: #000000;
    border-radius: 0.79rem;
    margin: 7px;
    padding: 7px;
`

const ProfileWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
`

const ProfilePicture = styled.img`
    width: 37px;
    height: 37px;
    cursor: pointer;
    border-radius: 50%;
    object-fit: cover;
`
const ProfileName = styled.p`
    color: #FFF;
    margin: 10px;
    cursor: pointer;
`