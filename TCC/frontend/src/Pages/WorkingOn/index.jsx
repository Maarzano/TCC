import styled from "styled-components";

const WorkingOn = () => {
    return (
        <Separação>
            <h1>EM DESENVOLVIMENTO</h1>
        </Separação>
    )
}

const Separação = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
    justify-content: center;
    margin: auto;
    font-size: 90px;
`

export default WorkingOn;