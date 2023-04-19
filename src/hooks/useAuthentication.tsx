import { createContext, ReactNode, useContext, useEffect, useState } from "react"

import Cookies from "js-cookie"
import axios from "axios"
import decode from "jwt-decode"
import { api } from "../common/api"

interface UserPayload {
  sub: string
  email: string
  username: string
  iat: number
  exp: number
}

type AuthenticationProps = {
  LogIn: (username: string, password: string) => Promise<void>
  isLogin: boolean
  user: UserPayload | null
}

type AuthenticationProviderProps = {
  children: ReactNode
}

const Authentication = createContext({} as AuthenticationProps)

export function AuthenticationProvider({children}: AuthenticationProviderProps) {
  const [ user, setUser ] = useState<UserPayload | null>(null)

  const isLogin = !!user

  useEffect(() => {
    validateUser()
  }, [])

  async function LogIn(username: string, password: string) {
    return await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { username, password })
      .then(({data}) => {
        if (data.token) {
          Cookies.set('dtmoney.token', data.token)
          setUser(decode(data.token))
        }
      })
      .catch((error) => console.error(error))
  }

  async function validateUser() {
    const token = Cookies.get('dtmoney.token')

    let getUser: any
    if (token) {
      getUser = decode(token)
    }

    if (getUser) {
      return await api.get(`/users/${getUser.username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.data?.id) {
            setUser(getUser)
          }
        })
        .catch((error) => setUser(null))
    }
  }

  return (
    <Authentication.Provider value={{ LogIn, isLogin, user }}>
      {children}
    </Authentication.Provider>
  )

}

export function useAuthentication() {
  const context = useContext(Authentication)
  return context
}
