import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { createServer, Model } from "miragejs"

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [ //Sempre o nome do model no plural
        {
          id: 1,
          title: "Desenvolvimento de site",
          type: "deposit",
          category: "Dev",
          amount: 10000,
          createdAt: new Date("2022-07-10 10:00:00"),
        },
        {
          id: 2,
          title: "Hospedagem",
          type: "withdraw",
          category: "Serviço",
          amount: 40,
          createdAt: new Date("2022-07-10 10:30:00"),
        }
      ],
    })
  },

  routes(this) {
    this.namespace = "api"

    this.get('/transactions', () => {
      return this.schema.all("transaction")
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)

      return schema.create("transaction", data) // 1- Model 2-Data
    })
  },
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
