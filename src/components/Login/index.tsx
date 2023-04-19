import { Container } from "./styles";
import { useAuthentication } from "../../hooks/useAuthentication";
import { notify } from "../../services/notify";

import { useForm } from "react-hook-form"
import { useEffect } from "react";

import logoImg from "../../assets/logo-only.svg"

type LoginProps = {
  setLogIn: (value: boolean) => void
}

export function Login({ setLogIn }: LoginProps) {
  const { LogIn, isLogin } = useAuthentication()
  const { register, handleSubmit } = useForm()

  useEffect(() => {
    setLogIn(isLogin)
    if (isLogin) return notify({ message: "Login feito com sucesso!", type: "success" })
  }, [isLogin])

  async function handleSignIn(data: any) {
    LogIn(data.username, data.password)
  }

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
          <form onSubmit={handleSubmit(handleSignIn)}>
            <div className="content-inputs">
              <input
                {...register('username')}
                type="text"
                name="username"
                placeholder="Usuário"
              />
              <input
                {...register('password')}
                type="password"
                name="password"
                placeholder="Senha"
              />
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
        <div className="welcome">
          <div className="main-information">
            <img src="background-login.png" alt="Imagem de fundo" />
            <p>Gerencie suas <br />finanças</p>
          </div>
          <div className="footer-information">
            <span>briefing: rocketseat</span>
            <span>develop: gabrielmelogm</span>
          </div>
        </div>
      </div>
    </Container>
  )
}