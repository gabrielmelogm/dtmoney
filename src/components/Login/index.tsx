import { Container } from "./styles";

import logoImg from "../../assets/logo-only.svg"
import googleImg from "../../assets/logo-google.svg"
import githubImg from "../../assets/logo-github.svg"

export function Login() {
  return (
    <Container>
      <div>
        <div className="login">
          <div>
            <img src={logoImg} alt="Logo" />
            <span>dtmoney</span>
          </div>
          <h2>Login</h2>
          <h3>Escolha como fazer login</h3>
          <button>
            <img src={googleImg} alt="Logo google" />
            Entrar com Google
          </button>
          <button>
            <img src={githubImg} alt="Logo github" />
            Entrar com GitHub
          </button>
        </div>
        <div className="welcome">
          <img src="background-login.png" alt="Imagem de fundo" />
          <p>Gerencie suas finanças</p>
          <span>briefing: rocketseat</span>
          <span>develop: gabrielmelogm</span>
        </div>
      </div>
    </Container>
  )
}