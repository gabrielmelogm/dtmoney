import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { auth } from "../firebase"

type AuthenticationProps = {
  LogInWithGoogle: () => Promise<void>
  LogInWithGitHub: () => Promise<void>
  signOut: () => Promise<void>
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
      setIsLogin(true)
      return user
    })
  }

  async function signOut() {
    await auth.signOut(auth.getAuth())
    return setIsLogin(false)
  }
  
  async function verifyIsLogin() {
    try {
      const getUser = await new Promise((resolve) => auth.onAuthStateChanged(auth.getAuth(), (user) => resolve(user)))
      if (getUser) {
        return setIsLogin(true)
      } else {
        return setIsLogin(false)
      }
    } catch (error) {
      return setIsLogin(false)
    } 
  }

  useEffect(() => {
    verifyIsLogin()
  }, [])

  return (
    <Authentication.Provider value={{ LogInWithGoogle, LogInWithGitHub, isLogin, signOut }}>
      {children}
    </Authentication.Provider>
  )

}

export function useAuthentication() {
  const context = useContext(Authentication)
  return context
}
