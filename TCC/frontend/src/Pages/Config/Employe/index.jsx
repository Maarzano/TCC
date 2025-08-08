import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import SearchLoader from '../../../Components/Loaders/SearchLoader';
import Search2 from '../../../Components/Searchs/Search2';
import CardStockEmployeeCart from '../../../Components/Cards/CardStockEmployeeCart';
import { deletarFuncionarioPorId } from '../../../Services/funcionarioService';
import { useFuncionarios } from '../../../Hooks/Funcionarios/useFuncionarios';
import AddEmployee from '../../../Components/Modal/AddEmployee';
import CreateBTN from '../../../Components/Buttons/CreateBTN';

const Funcionarios = () => {
  const { funcionarios: funcionariosOriginais, loading, erro } = useFuncionarios();
  const [searchTerm, setSearchTerm] = useState('');
  const [funcionarios, setFuncionarios] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (funcionariosOriginais.length > 0) {
      setFuncionarios(funcionariosOriginais);
    }
  }, [funcionariosOriginais]);

  const reloadFuncionarios = () => {
    if (funcionariosOriginais.length > 0) {
      setFuncionarios(funcionariosOriginais);
    }
    setTimeout(() => {
      window.location.reload();
    }, 600);
  };

  const deletarFuncionario = async (id) => {
    try {
      await deletarFuncionarioPorId(id);
      setFuncionarios((prev) => prev.filter((f) => f.funcionarioId !== id));
    } catch (error) {
      console.error('Erro ao deletar funcionário:', error);
      alert('Erro ao deletar funcionário. Verifique se o servidor está ativo.');
    }
  };

  const funcionariosFiltrados = useMemo(() => {
    return funcionarios.filter((funcionario) =>
      funcionario.nomeFuncionario.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, funcionarios]);

  return (
    <Wrapper>
      <h2>Funcionários</h2>
      <CreateBTN onClick={() => setModalOpen(true)} />
      <AddEmployee
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={reloadFuncionarios}
      />  
      <WrapperSearch>
        <Search2
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar no estoque..."
        />
      </WrapperSearch>

      {loading && (
        <>
          <p>Carregando funcionários...</p>
          <SearchLoader />
        </>
      )}

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      <div className="item-list">
        {funcionariosFiltrados.map((funcionario) => (
          <CardStockEmployeeCart
            key={funcionario.funcionarioId}
            type="employee"
            data={funcionario} // passa o objeto inteiro
            onDelete={() => deletarFuncionario(funcionario.funcionarioId)}
            expanded={expandedId === funcionario.funcionarioId}
            onExpand={() => setExpandedId(funcionario.funcionarioId)}
            onCollapse={() => setExpandedId(null)}
          />
        ))}

        {!loading && funcionariosFiltrados.length === 0 && (
          <p style={{ color: 'red', textAlign: 'center' }}>
            Nenhum funcionário encontrado
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

  .item-list {
    margin-bottom: 60px;
    color: wheat;
    font-size: 20px;
  }
`;

export default Funcionarios;
