import { useEffect, useState } from "react";
import Modal from "react-modal";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { Login } from "./components/Login";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { TransactionsProvider } from "./hooks/useTransactions";
import { AuthenticationProvider, useAuthentication } from "./hooks/useAuthentication";
import { GlobalStyle } from "./styles/global";

Modal.setAppElement("#root")

export function App() {
  const [ isNewTransactionModalOpen, setIsNewTransactionModalOpen ] = useState(false)
  const [ logIn, setLogIn ] = useState(false)
  const { isLogin } = useAuthentication()

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true)
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false)
  }

  useEffect(() => {
    setLogIn(isLogin)
  },[])

  return (
    <AuthenticationProvider>
      <TransactionsProvider>
        {
          logIn
            ? (
              <>
              <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
              <Dashboard />
              <NewTransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleCloseNewTransactionModal} />
              </>
            ) : (
              <Login />
            )
        }
        <GlobalStyle />
      </TransactionsProvider>
    </AuthenticationProvider>
  );
}
