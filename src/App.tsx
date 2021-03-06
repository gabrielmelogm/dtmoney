import { useState } from "react";
import Modal from "react-modal";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { Login } from "./components/Login";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { TransactionsProvider } from "./hooks/useTransactions";
import { AuthenticationProvider } from "./hooks/useAuthentication";
import { GlobalStyle } from "./styles/global";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement("#root")

export function App() {
  const [ isNewTransactionModalOpen, setIsNewTransactionModalOpen ] = useState(false)
  const [ logIn, setLogIn ] = useState(false)

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true)
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false)
  }

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
              <Login setLogIn={setLogIn} />
            )
        }
        <GlobalStyle />
        <ToastContainer />
      </TransactionsProvider>
    </AuthenticationProvider>
  );
}
