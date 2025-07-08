import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GoogleWhite from "../../../Assets/SVGs/Icons/icon-google-white.svg";
import GoogleColor from "../../../Assets/SVGs/Icons/icon-google-color.svg";
import { useLoginUsuario } from "../../../Hooks/Usuario/useLoginUsuario";
import { useNavigate } from "react-router-dom";

const CardLogin = ({ onSwitch }) => {
  const [emailCpf, setEmailCpf] = useState("");
  const [senha, setSenha] = useState("");
  const {login, loading, erro, sucesso, dataRecebido} = useLoginUsuario();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (emailCpf === "" || senha === ""){
        return
      }
    const info = {
      login: emailCpf, // ainda precisamos melhorar a lógica e outras coisas... 
      senha: senha  // TODO - guardar token etc...
    }
    login(info);
  };

  useEffect(() => {
    sucesso && navigate("/Gallery");
  }, [sucesso]);

  return (
  <StyledWrapper>
    <div className="form-container">
      <p className="title">Login</p>
      <form className="form" method="post">
        <div className="input-group">
          <label htmlFor="username">Email/Cpf</label>
          <input type="text" name="username" id="username" value={emailCpf} placeholder="convidado@exemplo.com"   onChange={(e) => setEmailCpf(e.target.value)} required/>
        </div>
        <div className="input-group">
          <label htmlFor="password">Senha</label>
          <input type="password" name="password" id="password" value={senha} placeholder="SenhaExemplo123.." onChange={(e) => setSenha(e.target.value)} required/>
          <div className="forgot">
            <a rel="noopener noreferrer" href="#">Esqueceu a senha ?</a>
          </div>
        </div>
        <button className="sign" onClick={handleLogin} disabled={loading}>{ loading ? "Carregando..." : "Entrar"}</button>
        {erro?.response?.status === 401 && <ErrorP>{`Você não está cadastrado`}</ErrorP>}
      </form>
      <div className="divider">
        <span>ou entre com</span>
      </div>
      <div className="social-buttons">
        <button type="button" className="social google" aria-label="Log in with Google">
          <span className="icon-google" />
          Google
        </button>
      </div>
      <p className="signup">
        Não tem conta?
        <a href="#" onClick={e => { e.preventDefault(); onSwitch(); }}> Cadastre-se</a>
      </p>
    </div>
  </StyledWrapper>
  )
};

const StyledWrapper = styled.div`
  .form-container {
    width: 100%;
    border-radius: 0.75rem;
    background-color: #111827;
    padding: 2rem;
    color: rgba(243, 244, 246, 1);
  }

  .title {
    text-align: center;
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 700;
  }

  .form {
    margin-top: 1.5rem;
  }

  .input-group {
    margin-top: 0.25rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .input-group label {
    display: block;
    color: rgba(156, 163, 175, 1);
    margin-bottom: 4px;
  }

  .input-group input {
    width: 100%;
    border-radius: 0.375rem;
    border: 1px solid rgba(55, 65, 81, 1);
    outline: 0;
    background-color: rgba(17, 24, 39, 1);
    padding: 0.75rem 1rem;
    color: rgba(243, 244, 246, 1);
  }

  .input-group input:focus {
    border-color: rgba(167, 139, 250);
  }

  .forgot {
    display: flex;
    justify-content: flex-end;
    font-size: 0.75rem;
    line-height: 1rem;
    color: rgba(156, 163, 175,1);
    margin: 8px 0 14px 0;
  }

  .forgot a,.signup a {
    color: rgba(243, 244, 246, 1);
    text-decoration: none;
    font-size: 14px;
  }

  .forgot a:hover, .signup a:hover {
    text-decoration: underline #a78bfa;
  }

  .sign {
    display: block;
    width: 100%;
    background-color: #a78bfa;
    padding: 0.75rem;
    text-align: center;
    color: #111827;
    border: none;
    border-radius: 0.375rem;
    font-weight: 600;
  }

  .divider {
    text-align: center;
    margin: 1.5rem 0 1rem 0;
    color: #a1a1aa;
    font-size: 0.9rem;
    position: relative;
  }

  .divider span {
    background: #111827;
    padding: 0 1rem;
    position: relative;
    z-index: 1;
  }

  .divider:before {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    background: #27272a;
    z-index: 0;
  }

  .social-buttons {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .social {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: center;
    background: #23272f;
    color: #fff;
    border: none;
    border-radius: 0.375rem;
    padding: 0.6rem 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
    position: relative;
    overflow: hidden;
  }

  .icon-google {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-image: url(${GoogleWhite});
    background-size: contain;
    background-repeat: no-repeat;
    transition: background-image 0.2s;
  }

  .social.google:hover .icon-google {
    background-image: url(${GoogleColor});
  }

  .signup {
    text-align: center;
    font-size: 0.75rem;
    line-height: 1rem;
    color: rgba(156, 163, 175, 1);
  }
`;

const ErrorP = styled.p`
  color: red;
`

export default CardLogin;
