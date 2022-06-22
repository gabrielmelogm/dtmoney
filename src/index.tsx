import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { createServer } from "miragejs"

createServer({
  routes(this) {
    this.namespace = "api"

    this.get('/transactions', () => {
      return [
        {
          id: 1,
          title: "Transaction 1",
          amount: 15000,
          type: "deposit",
          category: "Development",
          createAt: new Date()
        }
      ]
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
