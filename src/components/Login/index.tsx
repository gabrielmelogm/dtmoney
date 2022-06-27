import { Container } from "./styles";

import logoImg from "../../assets/logo-only.svg"
import googleImg from "../../assets/logo-google.svg"
import githubImg from "../../assets/logo-github.svg"
import { useAuthentication } from "../../hooks/useAuthentication";

export function Login() {
  const { LogInWithGoogle, LogInWithGitHub } = useAuthentication()

  return (
    <Container>
      <div className="main">
        <div className="login">
          <div className="title">
            <img src={logoImg} alt="Logo" />
            <span>dtmoney</span>
          </div>
          <h2>Login</h2>
          <h3>Escolha como fazer login</h3>
          <div className="content-button">
            <button onClick={LogInWithGoogle}>
              <img src={googleImg} alt="Logo google" />
              <span>Entrar com Google</span>
            </button>
            <button onClick={LogInWithGitHub}>
              <img src={githubImg} alt="Logo github" />
              <span>Entrar com GitHub</span>
            </button>
          </div>
        </div>
        <div className="welcome">
          <img src="background-login.png" alt="Imagem de fundo" />
          <p>Gerencie suas <br />finanças</p>
          <div className="footer-information">
            <span>briefing: rocketseat</span>
            <span>develop: gabrielmelogm</span>
          </div>
        </div>
      </div>
    </Container>
  )
}