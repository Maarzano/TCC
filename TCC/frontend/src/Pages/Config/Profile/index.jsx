import { useEffect, useState } from "react";
import styled from "styled-components";
import imagemProfile from "../../../Assets/SVGs/Icons/icon-profile-white&purple.svg";
import SaveCancelBTN from "../../../Components/Buttons/SaveCancelBTN";
import { placeholderProfile } from "../../../Utils/verificandoImagem";
import ajustarTamanhoImagemGoogle from "../../../Utils/ajustarTamanhoImagemGoogle";
import { atualizarUsuario } from '../../../Services/usuarioService';
import EditImageProfileModal from '../../../Components/Modal/EditImageProfileModal';

const Profile = () => {
    const [usuario, setUsuario] = useState({
        nomeCompleto: "",
        email: "",
        cpf: "",
        celular: "",
        senha: "",
        imagem: ""
    });

    const [isEditing, setIsEditing] = useState(false);
    const [usuarioOriginal, setUsuarioOriginal] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const usuarioSalvo = localStorage.getItem("usuario");
        
        if (usuarioSalvo) {
            const dados = JSON.parse(usuarioSalvo);
            setUsuario({
                nomeCompleto: dados.nomeCompleto || "",
                email: dados.email || "",
                cpf: dados.cpf || "",
                celular: dados.celular || "",
                senha: dados.senha || "",
                imagem: dados.imagem || "",
                usuarioID: dados.usuarioID
            });
        }
    }, []);

    const handleEdit = () => {
        setUsuarioOriginal({...usuario});
        setIsEditing(true);
        setErrors({});
    };

    const confirmCancel = () => {
        if (usuarioOriginal) {
            setUsuario({
                nomeCompleto: usuarioOriginal.nomeCompleto || "",
                email: usuarioOriginal.email || "",
                cpf: usuarioOriginal.cpf || "",
                celular: usuarioOriginal.celular || "",
                senha: usuarioOriginal.senha || "",
                imagem: usuarioOriginal.imagem || "",
                usuarioID: usuarioOriginal.usuarioID
            });
        }
        setIsEditing(false);
        setErrors({});
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUsuario((prev) => ({ ...prev, [id]: value }));
        
        if (errors[id]) {
            setErrors(prev => ({ ...prev, [id]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!usuario.nomeCompleto.trim()) {
            newErrors.nomeCompleto = "Nome é obrigatório";
        }
        
        if (!usuario.email.trim()) {
            newErrors.email = "Email é obrigatório";
        } else if (!/\S+@\S+\.\S+/.test(usuario.email)) {
            newErrors.email = "Email inválido";
        }

        if (!usuario.senha) {
            newErrors.senha = "Senha é obrigatória";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleConfirmSave = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            await atualizarUsuario(usuario.usuarioID, {
                nomeCompleto: usuario.nomeCompleto,
                senha: usuario.senha,
                cpf: usuario.cpf,
                celular: usuario.celular,
                email: usuario.email,
                imagem: usuario.imagem
            });
            localStorage.setItem("usuario", JSON.stringify(usuario));
            setIsEditing(false);
            setErrors({});
        } catch (e) {
            alert("Erro ao atualizar usuário");
        }
    };

    const handleImageClick = () => {
        if (isEditing) setShowModal(true);
    };

    const handleSaveImage = (newImageUrl) => {
        if (newImageUrl) {
            setUsuario(prev => ({ ...prev, imagem: newImageUrl }));
        }
    };

    return (
        <Wrapper>
            <Main>
                <h2>Meu Perfil</h2>
                <ProfileContent>
                    <div className="flex">
                        <ImgProfile
                            src={usuario.imagem ? placeholderProfile(ajustarTamanhoImagemGoogle(usuario.imagem, 256)) : imagemProfile}
                            alt="Perfil"
                            style={{ cursor: isEditing ? 'pointer' : 'default' }}
                            onClick={handleImageClick}
                        />
                        {isEditing && <EditHint>Clique na imagem para edita-la</EditHint>}
                    </div>
                    
                    <EditImageProfileModal
                        isOpen={showModal}
                        onClose={() => setShowModal(false)}
                        onSave={handleSaveImage}
                        currentImage={usuario.imagem ? placeholderProfile(ajustarTamanhoImagemGoogle(usuario.imagem, 256)) : imagemProfile}
                    />
                    <Form>
                        <DivInputLabelFirst>
                            <Label htmlFor="nomeCompleto">Nome Completo *</Label>
                            <Input 
                                id="nomeCompleto" 
                                value={usuario.nomeCompleto} 
                                readOnly={!isEditing} 
                                onChange={isEditing ? handleChange : undefined} 
                                placeholder="Digite seu nome completo"
                                error={errors.nomeCompleto}
                            />
                            {errors.nomeCompleto && <ErrorMessage>{errors.nomeCompleto}</ErrorMessage>}
                        </DivInputLabelFirst>
                        
                        <LadoDoOutro>
                            <DivInputLabel>
                                <Label htmlFor="cpf">CPF</Label>
                                <Input 
                                    id="cpf" 
                                    value={usuario.cpf} 
                                    readOnly={!isEditing} 
                                    onChange={isEditing ? handleChange : undefined} 
                                    placeholder="Digite seu CPF (opcional)"
                                />
                            </DivInputLabel>
                            <DivInputLabel>
                                <Label htmlFor="celular">Celular</Label>
                                <Input 
                                    id="celular" 
                                    value={usuario.celular} 
                                    readOnly={!isEditing} 
                                    onChange={isEditing ? handleChange : undefined} 
                                    placeholder="Digite seu celular (opcional)" 
                                />
                            </DivInputLabel>
                        </LadoDoOutro>
                        <DivInputLabel>
                            <Label htmlFor="email">Email *</Label>
                            <Input 
                                id="email" 
                                value={usuario.email} 
                                readOnly={!isEditing} 
                                onChange={isEditing ? handleChange : undefined} 
                                placeholder="Digite seu email"
                                error={errors.email}
                            />
                            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                        </DivInputLabel>
                        <DivInputLabel>
                            <Label htmlFor="senha">Senha *</Label>
                            <Input 
                                id="senha" 
                                value={usuario.senha} 
                                type="password" 
                                readOnly={!isEditing} 
                                onChange={isEditing ? handleChange : undefined} 
                                placeholder="Digite sua senha"
                                error={errors.senha}
                            />
                            {errors.senha && <ErrorMessage>{errors.senha}</ErrorMessage>}
                        </DivInputLabel>
                    </Form>
                </ProfileContent>
                <DivBTN center={!isEditing}>
                    {!isEditing ? (
                        <SaveCancelBTN type="edit" onClick={handleEdit} />
                    ) : (
                        <>
                            <SaveCancelBTN type="cancel" onConfirm={confirmCancel} />
                            <SaveCancelBTN type="save" data={usuario} onConfirm={handleConfirmSave} />
                        </>
                    )}
                </DivBTN>
            </Main>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    max-width: 1650px;
    margin: auto;
    background-color: black;
    color: wheat;
    height: 100vh;
    padding: 100px 100px 30px 100px;

    h2 {
        margin-bottom: 20px;
        color: wheat;
        margin-left: 40px;
    }
`;

const ProfileContent = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 40px;
    width: 100%;

    .flex {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

const ImgProfile = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #7c5cff;
    background: #23272f;
    box-shadow: 0 2px 8px rgba(0,0,0,0.10);
`;

const Main = styled.main`
    padding: 40px;
    margin: auto;
    background-color: #1a1a1a;
    border-radius: 20px;
    max-width: 870px;
`;

const Form = styled.form`
    flex: 2;
`;

const Label = styled.label`
    margin-left: 3px;
    display: inline-block;
    width: 100%;
`;

const DivInputLabelFirst = styled.div`
    margin-top: 0px;
`;

const DivInputLabel = styled.div`
    margin-top: 20px;
`;

const LadoDoOutro = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 20px;

    & > div {
        flex: 1;
    }
`;

const DivBTN = styled.div`
    margin: 25px;
    display: flex;
    flex-direction: row;
    justify-content: ${props => props.center ? 'center' : 'space-between'};
`;

const Input = styled.input`
    width: 100%;
    border-radius: 0.5rem;
    border: 1.5px solid ${props => props.error ? '#ff6b6b' : '#444'};
    outline: none;
    background-color: #23272f;
    padding: 0.85rem 1.1rem;
    color: wheat;
    font-size: 1.08rem;
    font-family: 'Segoe UI', 'Roboto', 'Arial', sans-serif;
    box-shadow: 0 1px 2px rgba(0,0,0,0.08);
    transition: border 0.2s, box-shadow 0.2s, background 0.2s;
    
    &:hover {
        border: 1.5px solid ${props => props.error ? '#ff6b6b' : '#7c5cff'};
        background: #262a35;
    }
    &:focus {
        border: 1.5px solid ${props => props.error ? '#ff6b6b' : '#a084ff'};
        box-shadow: 0 0 0 2px ${props => props.error ? 'rgba(255,107,107,0.15)' : 'rgba(160,132,255,0.15)'};
        background: #23272f;
    }
    &::placeholder {
        color: #bca;
        opacity: 0.7;
        font-style: italic;
    }
`;

const ErrorMessage = styled.span`
    color: #ff6b6b;
    font-size: 0.85rem;
    margin-top: 5px;
    display: block;
    font-family: 'Segoe UI', 'Roboto', 'Arial', sans-serif;
`;

const EditHint = styled.p`
    margin-top: 22px;
    font-size: 0.98rem;
    color: wheat;
    text-align: center;
    opacity: 0.85;
    letter-spacing: 0.02em;
    font-style: italic;
    font-family: 'Segoe UI', 'Roboto', 'Arial', sans-serif;
`;

export default Profile; 