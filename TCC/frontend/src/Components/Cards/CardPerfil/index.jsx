import styled from "styled-components";
import LogoutBTN from "../../Buttons/LogoutBTN"
import profilePictureWhite from "../../../Assets/SVGs/Icons/icon-profile-white&purple.svg";
import { Link } from "react-router-dom";

const CardPerfil = () => {
    
    return (
        <Wrapper>
            <ProfileWrapper>
                <ProfilePciture src={profilePictureWhite}/>{/* TODO - ainda precisamos conectar isso ao backend */}
                <ProfileName><Link to={"/Config/Profile"}>Convidado</Link></ProfileName>
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

const ProfilePciture = styled.img`
    height: 80%;
    cursor: pointer;
`
const ProfileName = styled.p`
    color: #FFF;
    margin: 10px;
    cursor: pointer;
`