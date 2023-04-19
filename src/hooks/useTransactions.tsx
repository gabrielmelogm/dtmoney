import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { useAuthentication } from "./useAuthentication"
import { api } from "../common/api"
import Cookies from "js-cookie"

type Transaction = {
  id: string
  title: string
  type: string
  category: string
  amount: number
  createdAt: string
  userId?: string
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

type TransactionsProviderProps = {
  children: ReactNode
}

type TransactionsContextData = {
  transactions: Transaction[]
  createTransaction: (transaction: TransactionInput) => Promise<void>
}

const Transactions = createContext<TransactionsContextData>({} as TransactionsContextData)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [ transactions, setTransactions ] = useState<Transaction[]>([])

  const { isLogin, user } = useAuthentication()

  async function getTransactions() {
    const token = Cookies.get('dtmoney.token')

    return await api.get(`/transactions/${user?.sub}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        let data: any = []

        response.data.map((transaction: any) => {
          data.push({
            id: transaction.id,
            title: transaction.title,
            type: transaction.type,
            category: transaction.category,
            amount: parseFloat(transaction.amount),
            createdAt: transaction.createAt,
            userId: transaction.userId,
          })
        })
        setTransactions(data)
      })
      .catch((error) => console.error(error))
  }
  
  useEffect(() => {
    if (isLogin) getTransactions()
  }, [isLogin])

  async function createTransaction(transactionInput: TransactionInput) {
    const token = Cookies.get('dtmoney.token')

    if (token) {
      await api.post('/transactions', {
          title: transactionInput.title,
          category: transactionInput.category,
          type: transactionInput.type,
          amount: transactionInput.amount,
          createdAt: new Date().toISOString(),
          userId: user?.sub,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      
      return await getTransactions()
    }
  }

  return (
    <Transactions.Provider value={{ transactions, createTransaction }}>
      {children}
    </Transactions.Provider>
  )
}

export function useTransactions() {
  const context = useContext(Transactions)

  return context
}