import { useState } from "react";
import styled from "styled-components";
import CardHistory from "../../../Components/Cards/CardHistory";
import HeaderHistory from "../../../Components/Headers/HeaderHistory";
import ExcelBTN from "../../../Components/Buttons/ExcelBTN";
import { useMovimentacao } from "../../../Hooks/Movimentacao/useMovimentacao";
import SearchLoader from "../../../Components/Loaders/SearchLoader";
import Search2 from "../../../Components/Searchs/Search2";

const History = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { loading, erro, data } = useMovimentacao();

  const filteredData = Array.isArray(data)
    ? data.filter((item) => {
        const termo = searchTerm.toLowerCase();

        const idMatch = item.idMovimentacao?.toString().includes(termo);
        const nomeFuncionarioMatch = item.funcionario?.nomeFuncionario?.toLowerCase().includes(termo);
        const tipoMatch = item.tipoMovimentacao?.toLowerCase().includes(termo);
        const dataFormatada = new Date(item.dataMovimentacao).toLocaleDateString("pt-BR");
        const dataMatch = dataFormatada.toLowerCase().includes(termo);

        
        const itemNomeMatch = item.itens?.some((i) =>
          i.nomeItem?.toLowerCase().includes(termo)
        );

        return (
          idMatch ||
          nomeFuncionarioMatch ||
          tipoMatch ||
          dataMatch ||
          itemNomeMatch
        );
      })
    : [];


  return (
    <Wrapper>
      <HeaderHistory />
      <ExcelBTN data={data} />
      <WrapperSearch>
        <Search2
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Pesquisar movimentação..."
        />
      </WrapperSearch>
      <Table>
        <HeaderRow>
          <HeaderCell width="7%">ID</HeaderCell>
          <HeaderCell width="20%">Nome</HeaderCell>
          <HeaderCell width="20%">Ação</HeaderCell>
          <HeaderCell width="40%">Itens</HeaderCell>
          <HeaderCell width="10%">Data e hora</HeaderCell>
        </HeaderRow>

        {filteredData.map((item, index) => (
          <CardHistory key={item.idMovimentacao || index} data={item} />
        ))}

        {loading && <SearchLoader />}
        {erro && <p>{erro.message}</p>}
      </Table>
    </Wrapper>
  );
};

export default History;

const Wrapper = styled.div`
  max-width: 1650px;
  margin: auto;
  background-color: black;
  color: white;
  height: 100%;
  min-height: 100vh;
  padding: 100px 100px 30px 100px;
`;

const WrapperSearch = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 20px;
`;

const Table = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 90px;
`;

const HeaderRow = styled.div`
  display: flex;
  background-color: #3a3a3a;
  padding: 10px 15px;
  font-weight: bold;
  width: 80%;
  margin: auto;
`;

const HeaderCell = styled.div`
  width: ${({ width }) => width || "auto"};
`;
