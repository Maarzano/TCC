// CardStockEmployeeCart.jsx
import React, { useMemo, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Arrow from '../../../Assets/SVGs/Icons/Arrow.svg';
import SaveCancelBTN from '../../Buttons/SaveCancelBTN';
import { placeholder } from '../../../Utils/verificandoImagem';

const CardStockEmployeeCart = ({ data, type, onDelete, expanded, onExpand, onCollapse }) => {
  const ref = useRef();

  useEffect(() => {
    if (!expanded) return;
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onCollapse && onCollapse();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [expanded, onCollapse]);

  const { nome, descricao, imagemSrc, infoExtra } = useMemo(() => {
    switch (type) {
      case 'employee':
        return {
          nome: data?.nome || data?.nomeFuncionario || 'Sem nome',
          descricao: data?.email || 'Sem descrição',
          imagemSrc: data?.imagem || data?.image,
          infoExtra: data?.funcionarioId ? `ID: ${data.funcionarioId}` : null,
        };
      case 'stock':
        return {
          nome: data?.nomeItem || data?.nome || 'Sem nome',
          descricao: data?.descricao || 'Sem descrição',
          imagemSrc: data?.imagem,
          infoExtra:
            data?.quantidade !== undefined && data?.quantidade !== null
              ? `Quantidade: ${data.quantidade}`
              : null,
        };
      default:
        return {
          nome: data?.nome || 'Sem nome',
          descricao: data?.descricao || 'Sem descrição',
          imagemSrc: data?.imagem,
          infoExtra: null,
        };
    }
  }, [data, type]);

  const onBtnClick = e => {
    e.stopPropagation();
  };

  return (
    <Wrapper
      ref={ref}
      onClick={() => (expanded ? onCollapse && onCollapse() : onExpand && onExpand())}
      className={expanded ? 'expanded' : ''}
      aria-expanded={expanded}
    >
      <div className="item-top">
        <div className="item-left">
          <img src={placeholder(imagemSrc)} alt={nome} className="item-image" />
          <div className="item-info">
            <span className="item-name">{nome}</span>
            <span className="item-description">{descricao}</span>
          </div>
        </div>
        <div className="item-right">
          {infoExtra && <span>{infoExtra}</span>}
          <img
            className={`img-Arrow ${expanded ? 'rotated' : ''}`}
            src={Arrow}
            alt="Expandir"
          />
        </div>
      </div>

      <div className={`extra-content-wrapper ${expanded ? 'expanded' : ''}`}>
        <div className="extra-content">
          <SaveCancelBTN type="edit" data={data} onClick={onBtnClick} />
          <SaveCancelBTN type="delete" data={data} onConfirm={onDelete} onClick={onBtnClick} />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #1a1a1a;
  border-radius: 20px;
  padding: 15px 20px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    transform: scale(1.015);
  }

  .item-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .item-left {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .item-info {
    display: flex;
    flex-direction: column;
  }

  .item-name {
    font-weight: 700;
    font-size: 25px;
    color: wheat;
  }

  .item-description {
    font-size: 14px;
    color: wheat;
    margin-top: 4px;
  }

  .item-image {
    width: 60px;
    height: 60px;
    border-radius: 8px;
    object-fit: cover;
  }

  .item-right {
    display: flex;
    align-items: center;
    gap: 10px;
    color: wheat;
  }

  .img-Arrow {
    width: 20px;
    transition: transform 0.3s ease;
  }

  .img-Arrow.rotated {
    transform: rotate(180deg);
  }

  .extra-content-wrapper {
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    transition: max-height 0.4s ease, opacity 0.4s ease;
  }

  .extra-content-wrapper.expanded {
    max-height: 150px;
    opacity: 1;
  }

  .extra-content {
    padding-top: 15px;
    border-top: 1px solid #444;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }
`;

export default CardStockEmployeeCart;
