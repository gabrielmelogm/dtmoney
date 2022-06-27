import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { auth } from "../firebase"

type AuthenticationProps = {
  LogInWithGoogle: () => Promise<string>
  LogInWithGitHub: () => Promise<string>
  isLogin: boolean
}

type AuthenticationProviderProps = {
  children: ReactNode
}

const Authentication = createContext<AuthenticationProps>(AuthenticationProvider)

export function AuthenticationProvider({children}: AuthenticationProviderProps) {
  const [ isLogin, setIsLogin ] = useState(false)
  
  async function LogInWithGoogle() {
    const provider = new auth.GoogleAuthProvider()
    const authProps = auth.getAuth()
  
    auth.signInWithPopup(authProps, provider).then((res) => {
      const credential = auth.GoogleAuthProvider.credentialFromResult(res)
      const user = res.user
      localStorage.setItem("token", `${credential?.accessToken}`)
      return user
    })
  }
  
  async function LogInWithGitHub() {
    const provider = new auth.GithubAuthProvider()
    const authProps = auth.getAuth()
    auth.signInWithPopup(authProps, provider).then((res) => {
      const credential = auth.GithubAuthProvider.credentialFromResult(res)
      const user = res.user
      localStorage.setItem("token", `${credential?.accessToken}`)
      return user
    })
  }
  
  function verifyIsLogin() {
    const isLogin = localStorage.getItem("token")
    if (isLogin) {
      return setIsLogin(true)
    } else {
      return setIsLogin(false)
    }
  }

  useEffect(() => {
    verifyIsLogin()
  },[])

  return (
    <Authentication.Provider value={{ LogInWithGoogle, LogInWithGitHub, isLogin }}>
      {children}
    </Authentication.Provider>
  )

}

export function useAuthentication() {
  const context = useContext(Authentication)
  return context
}
