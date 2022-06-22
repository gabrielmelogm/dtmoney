import { useEffect } from "react";
import { api } from "../../services/api";
import { Container } from "./styles";

export function TransactionsTable() {
  useEffect(() => {
    api.get("transactions")
      .then(response => console.log(response.data))
  }, [])

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Desenvolvimento de website</td>
            <td className="deposit">R$15.000</td>
            <td>Desenvolvimento</td>
            <td>23/06/2022</td>
          </tr>
          <tr>
            <td>Hospedagem</td>
            <td className="withdraw">- R$30</td>
            <td>Conta</td>
            <td>23/06/2022</td>
          </tr>
        </tbody>
      </table>
    </Container>
  )
}