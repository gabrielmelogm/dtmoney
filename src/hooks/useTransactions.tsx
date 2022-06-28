import { collection, getDocs } from "firebase/firestore"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { db } from "../firebase"
import { api } from "../services/api"

type Transaction = {
  id: number
  title: string
  type: string
  category: string
  amount: number
  createdAt: string
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

  async function getTransactions() {
    let data: any = []
    const transactionsList = await getDocs(collection(db, "transactions"))
    transactionsList.forEach((response) => {
      const itemId = response.id
      const itemData = response.data()
      itemData.id = itemId
      data.push(itemData)
    })
    setTransactions(data)
  }
  
  useEffect(() => {
    getTransactions()
  }, [])

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post("/transactions", {...transactionInput, createdAt: new Date()})
    const { transaction } = response.data
    setTransactions([...transactions, transaction])
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