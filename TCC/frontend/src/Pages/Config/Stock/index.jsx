// Stock.jsx
import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { useProdutos } from '../../../Hooks/Produtos/useProdutos';
import SearchLoader from '../../../Components/Loaders/SearchLoader';
import Search2 from '../../../Components/Searchs/Search2';
import CardStockEmployeeCart from '../../../Components/Cards/CardStockEmployeeCart';
import { deletarProdutoPorId } from '../../../Services/prudutoService';

const Stock = () => {
  const { produtos: produtosOriginais, loading, erro } = useProdutos([]);
  const [busca, setBusca] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [expandedId, setExpandedId] = useState(null); // Novo estado para controlar expansão

  useEffect(() => {
    if (produtosOriginais.length > 0) {
      setProdutos(produtosOriginais);
    }
  }, [produtosOriginais]);

  const deletarProduto = async (id) => {
    try {
      await deletarProdutoPorId(id);
      setProdutos((prev) => prev.filter((p) => p.itemId !== id));
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      alert('Erro ao deletar produto. Verifique se o servidor está ativo.');
    }
  };

  const produtosFiltrados = useMemo(() => {
    const termo = busca.toLowerCase();
    return produtos.filter((item) =>
      item.nomeItem?.toLowerCase().includes(termo) ||
      item.descricao?.toLowerCase().includes(termo)
    );
  }, [busca, produtos]);

  return (
    <Wrapper>
      <h2>Itens do estoque</h2>

      <WrapperSearch>
        <Search2
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar no estoque..."
        />
      </WrapperSearch>

      {loading && (
        <>
          <p>Carregando itens...</p>
          <SearchLoader />
        </>
      )}

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      <div className="item-list">
        {produtosFiltrados.map((item) => (
          <CardStockEmployeeCart
            key={item.itemId}
            data={item}
            type="stock"
            onDelete={() => deletarProduto(item.itemId)}
            expanded={expandedId === item.itemId}
            onExpand={() => setExpandedId(item.itemId)}
            onCollapse={() => setExpandedId(null)}
          />
        ))}

        {!loading && produtosFiltrados.length === 0 && (
          <p style={{ color: 'red', textAlign: 'center' }}>
            Nenhum produto encontrado
          </p>
        )}
      </div>
    </Wrapper>
  );
};

const WrapperSearch = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: center;
  width: 100%;
`;

const Wrapper = styled.div`
  background-color: black;
  color: wheat;
  padding: 100px 100px 30px 100px;
  max-width: 1650px;
  margin: auto;
  position: relative;
  min-height: 100vh;

  h2 {
    margin-bottom: 10px;
  }

  .search-box {
    position: relative;
    margin-bottom: 20px;
  }

  .search-input {
    width: 500px;
    padding: 10px 15px 10px 50px;
    border: 1px solid wheat;
    border-radius: 9999px;
    outline: none;
    color: wheat;
  }

  .search-icon {
    position: absolute;
    width: 35px;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
  }

  .item-list {
    margin-bottom: 60px;
    color: wheat;
    text-transform: capitalize;
    font-size: 20px;
  }
`;

export default Stock;
