import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Arrow from "../../../Assets/SVGs/Icons/Arrow.svg"

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <Button onClick={() => navigate("/Gallery")} aria-label="Voltar para a galeria">
            <img src={Arrow} alt="Voltar" />
        </Button>
    );
};

const Button = styled.button`
    background: none;
    border: none;
    cursor: pointer;

    img {
        width: 24px;
        height: 24px;
        transform: rotate(90deg);
    }
`;

export default BackButton;
