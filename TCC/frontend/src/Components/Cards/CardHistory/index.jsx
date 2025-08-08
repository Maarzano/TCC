import { useState } from "react";
import styled from "styled-components";
import { placeholderProfile } from '../../../Utils/verificandoImagem';

const CardHistory = ({ data }) => {
    const [expanded, setExpanded] = useState(false);

    const visibleItems = expanded ? data.itens : data.itens.slice(0, 3);
    const showExpand = data.itens.length > 3;

    return (
        <Row>
            <Cell width="7%">{data.idMovimentacao}</Cell>

            <Cell width="20%" flex>
                <UserImage src={placeholderProfile(data.funcionario.image)} />
                <UserName>{data.funcionario?.nomeFuncionario || "_"}</UserName>
            </Cell>

            <Cell width="20%">
                <ActionType>{data.tipoMovimentacao}</ActionType>
            </Cell>

            <Cell width="40%">
                <InlineItemList>
                    {visibleItems.map((item, index) => (
                    <span key={index}>
                        {item.nomeItem} (x{item.quantidade}) {index < visibleItems.length - 1 ? ', ' : ''}
                    </span>
                    ))}

                    {showExpand && !expanded && (
                        <>
                            ...{" "}
                            <ExpandButton onClick={() => setExpanded(true)}>ver mais</ExpandButton>
                        </>
                    )}
                    {expanded && (
                        <ExpandButton onClick={() => setExpanded(false)}>ver menos</ExpandButton>
                    )}
                </InlineItemList>
            </Cell>

            <Cell width="11%">
                <DateTime>{new Date(data.dataMovimentacao).toLocaleString("pt-BR")}</DateTime>
            </Cell>
        </Row>
    );
};

const Row = styled.div`
    display: flex;
    align-items: center;
    width: 80%;
    padding: 15px;
    border-bottom: 1px solid #444444;
    background-color:rgb(0, 0, 0);
    margin: auto;
`;

const Cell = styled.div`
    width: ${({ width }) => width || 'auto'};
    display: ${({ flex }) => (flex ? 'flex' : 'block')};
    align-items: center;
    gap: 10px;
`;

const UserImage = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
`;

const UserName = styled.span`
    font-weight: 500;
`;

const ActionType = styled.span`
    font-weight: bold;
    color: ${({ children }) =>
        children === "SAIDA" ? "#4caf50" :
        children === "ENTRADA" ? "#2196f3" : "#fff"};
`;

const InlineItemList = styled.div`
    font-size: 0.9rem;
    white-space: wrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ExpandButton = styled.button`
    background: none;
    border: none;
    color: #1e90ff;
    cursor: pointer;
    font-size: 0.85rem;
    margin-left: 5px;

    &:hover {
        text-decoration: underline;
    }
`;

const DateTime = styled.span`
    font-size: 0.85rem;
`;

export default CardHistory;
