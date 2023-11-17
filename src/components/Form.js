import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTransaction } from "../features/transaction/transactionSlice";

export default function Form() {

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [amount, setAmount] = useState(0);
    const dispatch = useDispatch();
    const {isLoading, isError, } = useSelector(state => state.transaction)

    const handleCreate = (e) =>{
        e.preventDefault()
        dispatch(createTransaction({
            name,
            type,
            amount: Number(amount)
        }))
    }


    return (
        <div className="form">
            <h3>Add new transaction</h3>

            <form onSubmit={handleCreate}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={name}
                        placeholder="Enter title..."
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-group radio">
                    <label>Type</label>
                    <div className="radio_group">
                        <input
                            type="radio"
                            value="income"
                            required
                            name="transaction_type"
                            checked={type === "income"}
                            onChange={() => setType("income")}
                        />
                        <label >Income</label>
                    </div>
                    <div className="radio_group">
                        <input
                            type="radio"
                            value="expense"
                            name="transaction_type"
                            placeholder="Expense"
                            checked={type === "expense"}
                            onChange={() => setType("expense")}
                        />
                        <label >Expense</label>
                    </div>
                </div>

                <div className="form-group">
                    <label for="transaction_amount">Amount</label>
                    <input
                        type="number"
                        placeholder="300"
                        name="amount"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                    />
                </div>

                <button disabled={isLoading} className="btn">Submit</button>

            </form>
            {
                isError &&
                <p className="error">There Was an error occerd</p>
            }

            <button className="btn cancel_edit">Cancel Edit</button>
        </div>
    );
}
