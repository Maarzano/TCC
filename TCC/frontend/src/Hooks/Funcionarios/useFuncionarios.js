// src/Hooks/Funcionarios/useFuncionarios.js
import { useEffect, useState } from 'react';
import { getFuncionarios } from '../../Services/funcionarioService';

export const useFuncionarios = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dados = await getFuncionarios();
        setFuncionarios(dados);
      } catch (error) {
        setErro('Erro ao carregar funcionários');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { funcionarios, loading, erro };
};
