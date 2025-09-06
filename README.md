# 🧾 Algorand Expense Tracker dApp

## 📌 Project Description
This project is a **daily expense tracker decentralized application (dApp)** built on the **Algorand blockchain** using [Algorand TypeScript SDK](https://github.com/algorandfoundation/algokit).  
It demonstrates how to write, compile, and deploy simple Algorand smart contracts in TypeScript, and how to interact with them from a frontend or client.

---

## 💡 What it does
The Expense Tracker dApp lets users record expenses directly on the Algorand blockchain.  
It stores:
- The **total amount** of all expenses.
- The **most recent expense description**.

All data is persisted in the contract’s **global state**, making it tamper-proof and verifiable.

---

## ✨ Features
- ✅ **Add Expenses** – Record a new expense with an amount and description.  
- ✅ **Track Totals** – Automatically keeps a running total of all expenses.  
- ✅ **Get Last Expense** – View the most recent expense entry.  
- ✅ **On-Chain Logic** – Uses Algorand smart contract global state for secure storage.  
- ✅ **Beginner-Friendly Code** – Clear, simple TypeScript syntax for learning Algorand contracts.

---

## 🔗 Deployed Smart Contract
Contract deployed at: **XXX**

---

## 🛠️ Smart Contract Code
import { Contract, GlobalState, uint64, Uint64, bytes, Bytes, assert } from "@algorandfoundation/algorand-typescript"

export class ExpenseTracker extends Contract {
  // Store the total amount spent
  totalExpenses = GlobalState<uint64>({ key: "totalExpenses", initialValue: Uint64(0) })

  // Store the most recent expense description
  lastExpense = GlobalState<bytes>({ key: "lastExpense", initialValue: Bytes("") })

  // Add a new expense
  addExpense(amount: uint64, description: bytes): bytes {
    assert(amount > Uint64(0), "Amount must be greater than zero")
    // Update totals
    this.totalExpenses.value = Uint64(this.totalExpenses.value + amount)
    this.lastExpense.value = description

    return description
  }

  // Get total expenses
  getTotal(): uint64 {
    return this.totalExpenses.value
  }

  // Get last recorded expense
  getLastExpense(): bytes {
    return this.lastExpense.value
  }
}
