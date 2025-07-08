import styled from "styled-components";

const FuncionarioSelect = () => {
    const funcionarios = [
        "Gabriel",
        "Armazano",
        "Calanguinho",
        "Fedorento"
    ];

    return (
        <Wrapper>
            <input
                list="funcionarios"
                placeholder="Funcionário que está realizando a ação"
            />
            <datalist id="funcionarios">
                {funcionarios.map((nome, index) => (
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
        color: #d2b48c;
    }
`;

export default FuncionarioSelect;