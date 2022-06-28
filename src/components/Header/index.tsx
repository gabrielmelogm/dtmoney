import logoImg from "../../assets/logo.svg"
import { auth } from "../../firebase"
import { useAuthentication } from "../../hooks/useAuthentication"
import { Container, Content } from "./styles"

type HeaderProps = {
  onOpenNewTransactionModal: () => void
}

export function Header({ onOpenNewTransactionModal }: HeaderProps) {

  const { signOut } = useAuthentication()

  function logOut() {
    signOut()
    document.location.reload()
  }

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt money" />
        <div>
          <button
            type="button"
            onClick={onOpenNewTransactionModal}
          >
            Nova transação
          </button>
          <img 
            src={`${auth.getAuth().currentUser?.photoURL}`}
            alt="Foto de perfil"
            onClick={logOut}
          />
        </div>
        
      </Content>
    </Container>
  )
}