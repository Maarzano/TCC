import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '../index';

const EditImageProfileModal = ({ isOpen, onClose, onSave, currentImage }) => {
    const [newImage, setNewImage] = useState("");
    const [imgError, setImgError] = useState(false);

    useEffect(() => {
        setNewImage(""); 
        setImgError(false);
    }, [isOpen]);

    const imgSrc = newImage || currentImage;
    const showFallback = !imgSrc || imgError;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ContentWrapper>
                <h3>Alterar Imagem de Perfil</h3>
                <PreviewImgWrapper>
                    {showFallback ? (
                        <FallbackText>Nova Imagem</FallbackText>
                    ) : (
                        <PreviewImg
                            src={imgSrc}
                            alt="Nova Imagem"
                            onError={() => setImgError(true)}
                        />
                    )}
                </PreviewImgWrapper>
                <Input
                    type="text"
                    placeholder="Cole o link da nova imagem"
                    value={newImage}
                    onChange={e => { setNewImage(e.target.value); setImgError(false); }}
                />
                <ButtonRow>
                    <CancelButton onClick={onClose}>Cancelar</CancelButton>
                    <SaveButton onClick={() => { onSave(newImage); onClose(); }}>Salvar</SaveButton>
                </ButtonRow>
            </ContentWrapper>
        </Modal>
    );
};

const ContentWrapper = styled.div`
    background: #222;
    color: #623bda;
    padding: 32px 24px 24px 24px;
    border-radius: 16px;
    min-width: 320px;
    box-shadow: 0 2px 16px rgba(0,0,0,0.3);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const PreviewImgWrapper = styled.div`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: #23272f;
    border: 2.5px solid #7c5cff;
    margin-bottom: 16px;
    margin-top: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
`;

const PreviewImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    display: block;
`;

const FallbackText = styled.span`
    color: #bca;
    font-size: 1.08rem;
    opacity: 0.8;
    text-align: center;
    font-style: italic;
    font-family: 'Segoe UI', 'Roboto', 'Arial', sans-serif;
    width: 100%;
    padding: 0 10px;
`;

const Input = styled.input`
    width: 100%;
    border-radius: 0.375rem;
    border: 1px solid rgba(55, 65, 81, 1);
    outline: 0;
    background-color: rgba(17, 24, 39, 1);
    padding: 0.75rem 1rem;
    color: white;
    margin-bottom: 16px;
`;

const ButtonRow = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-top: 8px;
`;

const BaseButton = styled.button`
    padding: 8px 16px;
    color: #fff;
    font-size: 1.17em;
    border-radius: 15px;
    border: none;
    font-weight: bold;
    cursor: pointer;
`;

const CancelButton = styled(BaseButton)`
    background:rgb(22, 22, 22);
`;

const SaveButton = styled(BaseButton)`
    background: #623bda;
`;

export default EditImageProfileModal; 