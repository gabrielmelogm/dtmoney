import { Container } from "./styles";

export function TransactionsTable() {
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