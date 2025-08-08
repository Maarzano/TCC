import React, { useState, useEffect } from 'react';
import Modal from '../index';
import ConfirmActionModal from '../ConfirmActionModal';
import styled from 'styled-components';
import { criarProduto, editarProdutoPorId } from '../../../Services/prudutoService';

const AddItemToStockModal = ({ isOpen, onClose, onSuccess, initialData }) => {
  const [form, setForm] = useState({
    nomeItem: '',
    quantidade: '',
    imagem: '',
    descricao: ''
  });
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (initialData && isOpen) {
      setForm({
        nomeItem: initialData.nomeItem || '',
        quantidade: initialData.quantidade !== undefined ? initialData.quantidade : '',
        imagem: initialData.imagem || '',
        descricao: initialData.descricao || ''
      });
    } else if (!isOpen) {
      setForm({
        nomeItem: '',
        quantidade: '',
        imagem: '',
        descricao: ''
      });
    }
  }, [initialData, isOpen]);

  const isEdit = !!initialData?.itemId;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErro('');
    if (!form.nomeItem.trim() || !form.quantidade) {
      setErro('Nome e quantidade são obrigatórios.');
      return;
    }
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    setLoading(true);
    setErro('');
    try {
      if (isEdit) {
        await editarProdutoPorId(initialData.itemId, {
          nomeItem: form.nomeItem,
          quantidade: Number(form.quantidade),
          imagem: form.imagem || undefined,
          descricao: form.descricao || undefined
        });
      } else {
        await criarProduto({
          nomeItem: form.nomeItem,
          quantidade: Number(form.quantidade),
          imagem: form.imagem || undefined,
          descricao: form.descricao || undefined
        });
      }
      setForm({ nomeItem: '', quantidade: '', imagem: '', descricao: '' });
      setShowConfirm(false);
      if (onSuccess) onSuccess();
      onClose();
    } catch (e) {
      setErro(isEdit ? 'Erro ao editar produto.' : 'Erro ao criar produto.');
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
          <h2>{isEdit ? "Editar produto" : "Criar novo produto"}</h2>
          <label>
            Nome do item*
            <input
              name="nomeItem"
              value={form.nomeItem}
              onChange={handleChange}
              required
              disabled={loading}
              autoFocus
            />
          </label>
          <label>
              Quantidade*
                <input
                  name="quantidade"
                  type="number"
                  min="0"
                  value={form.quantidade}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
          </label>
          <label>
            Imagem (URL)
            <input
              name="imagem"
              value={form.imagem}
              onChange={handleChange}
              disabled={loading}
            />
          </label>
          <label>
            Descrição
            <textarea
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
              disabled={loading}
              rows={3}
            />
          </label>
          {erro && <ErrorMsg>{erro}</ErrorMsg>}
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
        data={{ nomeItem: form.nomeItem }}
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
  label {
    display: flex;
    flex-direction: column;
    font-weight: 600;
    color: #333;
    gap: 4px;
    color: #fff;
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

const ErrorMsg = styled.div`
  color: #b31414;
  font-weight: bold;
  text-align: center;
`;

export default AddItemToStockModal;
