import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { auth } from "../firebase"

type AuthenticationProps = {
  LogInWithGoogle: () => Promise<void>
  LogInWithGitHub: () => Promise<void>
  isLogin: boolean
}

type AuthenticationProviderProps = {
  children: ReactNode
}

const Authentication = createContext({} as AuthenticationProps)

export function AuthenticationProvider({children}: AuthenticationProviderProps) {
  const [ isLogin, setIsLogin ] = useState(false)
  
  async function LogInWithGoogle() {
    const provider = new auth.GoogleAuthProvider()
    const authProps = auth.getAuth()
  
    auth.signInWithPopup(authProps, provider).then((res) => {
      const credential = auth.GoogleAuthProvider.credentialFromResult(res)
      const user = res.user
      localStorage.setItem("token", `${credential?.accessToken}`)
      setIsLogin(true)
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
      setIsLogin(true)
      return user
    })
  }
  
  function verifyIsLogin() {
    const token = localStorage.getItem("token")
    if (token) {
      return setIsLogin(true)
    } else {
      return setIsLogin(false)
    }
  }

  useEffect(() => {
    verifyIsLogin()
  }, [])

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
