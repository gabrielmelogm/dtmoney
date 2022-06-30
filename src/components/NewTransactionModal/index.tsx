import Modal from "react-modal"
import { Container, TransactionTypeContainer, RadioBox } from "./styles"
import { FormEvent, useState } from "react"

import closeImg from "../../assets/close.svg"
import incomeImg from "../../assets/income.svg"
import outcomeImg from "../../assets/outcome.svg"
import { useTransactions } from "../../hooks/useTransactions"
import { notify } from "../../services/notify"

type NewTransactionModalProps = {
  isOpen: boolean
  onRequestClose: () => void
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const { createTransaction } = useTransactions()

  const [ title, setTitle] = useState("")
  const [ amount, setAmount] = useState(0)
  const [ category, setCategory] = useState("")
  const [ type, setType ] = useState("deposit")

  const [ loading, setLoading ] = useState(false)

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault()
    try {
      setLoading(true)
      const data = { title, amount, category, type }
      await createTransaction(data)
      setTitle("")
      setCategory("")
      setType("deposit")
      setAmount(0)
      setLoading(false)
      notify({ message: "Transação cadastrada com sucesso!", type: "success" })
      return onRequestClose()
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input
          placeholder="Título"
          value={title}
          onChange={({target}) => setTitle(target.value)}
          required
        />
        <input
          type="number"
          placeholder="R$"
          value={amount !== 0 ? amount : " "}
          onChange={({target}) => setAmount(Number(target.value))}
          required
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => setType("deposit")}
            isActive={type === "deposit"}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={() => setType("withdraw")}
            isActive={type === "withdraw"}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder="Categoria"
          value={category}
          onChange={({target}) => setCategory(target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
        >
          Cadastrar
        </button>
      </Container>
    </Modal>
  )
}