import styled from "styled-components";

const ItemSearch = ({ value, onChange, itemNames }) => {
    return (
        <Wrapper>
            <input
                list="itens"
                placeholder="Filtrar itens do carrinho"
                value={value}
                onChange={onChange}
            />
            <datalist id="itens">
                {itemNames.map((nome, index) => (
                    <option key={index} value={nome} />
                ))}
            </datalist>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    margin: 15px 0;

    input {
        padding: 10px;
        border-radius: 10px;
        width: 100%;
        background-color: #1a1a1a;
        color: wheat;
        border: 1px solid #ccc;
        font-size: 16px;
    }

    input::placeholder {
        color:rgb(255, 255, 255);
    }
`;

export default ItemSearch;
