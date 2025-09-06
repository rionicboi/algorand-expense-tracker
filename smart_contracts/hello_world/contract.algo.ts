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
