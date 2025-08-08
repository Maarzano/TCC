import React, { useState, useEffect } from 'react';
import Modal from '../index';
import ConfirmActionModal from '../ConfirmActionModal';
import styled from 'styled-components';
import { criarFuncionario, editarFuncionarioPorId } from '../../../Services/funcionarioService';

const AddEmployee = ({ isOpen, onClose, onSuccess, initialData }) => {
  const [form, setForm] = useState({
    nomeFuncionario: '',
    emailFuncionario: '',
    cpfFuncionario: '',
    celularFuncionario: '',
    dataNascimentoFuncionario: '',
    descricaoFuncionario: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const isEdit = !!initialData?.funcionarioId;

  useEffect(() => {
    if (initialData && isOpen) {
      let dataNascimento = "";
      if (initialData.dataNascimentoFuncionario) {
        // Converte para string YYYY-MM-DD se vier como Date ou timestamp
        const dateObj = new Date(initialData.dataNascimentoFuncionario);
        if (!isNaN(dateObj.getTime())) {
          dataNascimento = dateObj.toISOString().slice(0, 10);
        } else if (typeof initialData.dataNascimentoFuncionario === "string") {
          // Se já vier como string, tenta usar diretamente
          dataNascimento = initialData.dataNascimentoFuncionario.slice(0, 10);
        }
      }
      setForm({
        nomeFuncionario: initialData.nomeFuncionario || initialData.nome || '',
        emailFuncionario: initialData.emailFuncionario || initialData.email || '',
        cpfFuncionario: initialData.cpfFuncionario || initialData.cpf || '',
        celularFuncionario: initialData.celularFuncionario || initialData.celular || '',
        dataNascimentoFuncionario: dataNascimento,
        descricaoFuncionario: initialData.descricaoFuncionario || initialData.descricao || '',
        image: initialData.image || initialData.imagem || ''
      });
    } else if (!isOpen) {
      setForm({
        nomeFuncionario: '',
        emailFuncionario: '',
        cpfFuncionario: '',
        celularFuncionario: '',
        dataNascimentoFuncionario: '',
        descricaoFuncionario: '',
        image: ''
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSubmit chamado');
    setError('');
    if (
      !form.nomeFuncionario.trim() ||
      !form.emailFuncionario.trim() ||
      !form.cpfFuncionario.trim() ||
      !form.celularFuncionario.trim()
    ) {
      setError('Nome, email, CPF e celular são obrigatórios.');
      return;
    }
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    setLoading(true);
    setError('');
    try {
      if (isEdit) {
        await editarFuncionarioPorId(initialData.funcionarioId, {
          nomeFuncionario: form.nomeFuncionario,
          emailFuncionario: form.emailFuncionario,
          cpfFuncionario: form.cpfFuncionario,
          ativo: true,
          celularFuncionario: form.celularFuncionario,
          dataNascimentoFuncionario: form.dataNascimentoFuncionario || undefined,
          descricaoFuncionario: form.descricaoFuncionario || undefined,
          image: form.image || undefined
        });
      } else {
        await criarFuncionario({
          nomeFuncionario: form.nomeFuncionario,
          emailFuncionario: form.emailFuncionario,
          cpfFuncionario: form.cpfFuncionario,
          ativo: true,
          celularFuncionario: form.celularFuncionario,
          dataNascimentoFuncionario: form.dataNascimentoFuncionario || undefined,
          descricaoFuncionario: form.descricaoFuncionario || undefined,
          image: form.image || undefined
        });
      }
      console.log('Requisição enviada com sucesso');
      setForm({
        nomeFuncionario: '',
        emailFuncionario: '',
        cpfFuncionario: '',
        celularFuncionario: '',
        dataNascimentoFuncionario: '',
        descricaoFuncionario: '',
        image: ''
      });
      setShowConfirm(false);
      if (onSuccess) onSuccess();
      onClose();
    } catch (e) {
      console.error('Erro ao cadastrar funcionário:', e);
      setError(isEdit ? 'Erro ao editar funcionário.' : 'Erro ao cadastrar funcionário.');
    } finally {
      setLoading(false);
    }
    setTimeout(() => {
      window.location.reload();
    }, 600);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <FormWrapper onSubmit={handleSubmit}>
          <h2>{isEdit ? "Editar funcionário" : "Cadastrar novo funcionário"}</h2>
          <FieldsGrid>
            <label>
              Nome*
              <input
                name="nomeFuncionario"
                value={form.nomeFuncionario}
                onChange={handleChange}
                required
                disabled={loading}
                autoFocus
              />
            </label>
            <label>
              Email*
              <input
                name="emailFuncionario"
                value={form.emailFuncionario}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </label>
            <label>
              CPF*
              <input
                name="cpfFuncionario"
                value={form.cpfFuncionario}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </label>
            <label>
              Celular*
              <input
                name="celularFuncionario"
                value={form.celularFuncionario}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </label>
            <label>
              Data de Nascimento
              <input
                name="dataNascimentoFuncionario"
                value={form.dataNascimentoFuncionario}
                onChange={handleChange}
                type="date"
                disabled={loading}
              />
            </label>
            <label>
              Imagem (URL)
              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                disabled={loading}
              />
            </label>
          </FieldsGrid>
          <DescricaoLabel>
            Descrição
            <textarea
              name="descricaoFuncionario"
              value={form.descricaoFuncionario}
              onChange={handleChange}
              disabled={loading}
              rows={1}
            />
          </DescricaoLabel>
          <ButtonRow>
            <button type="button" onClick={onClose} disabled={loading}>Cancelar</button>
            <button type="submit" disabled={loading}>{loading ? 'Salvando...' : 'Salvar'}</button>
          </ButtonRow>
        </FormWrapper>
      </Modal>
      <ConfirmActionModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
        type="save"
        data={{
          nomeFuncionario: form.nomeFuncionario,
          emailFuncionario: form.emailFuncionario,
          cpfFuncionario: form.cpfFuncionario,
          celularFuncionario: form.celularFuncionario,
          dataNascimentoFuncionario: form.dataNascimentoFuncionario,
          descricaoFuncionario: form.descricaoFuncionario,
          image: form.image
        }}
      />
    </>
  );
};

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-width: 350px;
  padding: 30px 20px 20px 20px;
  background: #1e1e1e;
  border-radius: 12px;
  h2 {
    margin-bottom: 10px;
    color: #623bda;
    text-align: center;
    font-size: 26px;
  }
`;

// Adicione este novo styled-component para o grid de campos
const FieldsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
  label {
    display: flex;
    flex-direction: column;
    font-weight: 600;
    color: #fff;
    gap: 4px;
  }
  input, textarea {
    border: 0.5px solid rgba(255, 255, 255, 0.09);
    border-radius: 8px;
    padding: 8px;
    font-size: 1rem;
    background: #1e1e1e;
    color: #fff;
    resize: none;
  }
  input:disabled, textarea:disabled {
    background: #eee;
  }
`;

// Adicione este styled-component para o label da descrição
const DescricaoLabel = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: 600;
  color: #fff;
  gap: 4px;
  width: 100%;
  textarea {
    border: 0.5px solid rgba(255, 255, 255, 0.09);
    border-radius: 8px;
    padding: 8px;
    font-size: 1rem;
    background: #1e1e1e;
    color: #fff;
    resize: none;
  }
  textarea:disabled {
    background: #eee;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  button {
    padding: 8px 18px;
    border-radius: 8px;
    border: none;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    background: #623bda;
    color: #fff;
    transition: background 0.2s;
    &:hover:not(:disabled) {
      background: #4b2bb3;
    }
    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    &:first-child {
      background: #333;
      color: white;
      &:hover:not(:disabled) {
        background:rgba(51, 51, 51, 0.84);
      }
    }
  }
`;



export default AddEmployee;
