import { useState } from "react";

export default function Form() {

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [amount, setAmount] = useState(0);

    const handleCreate = (e) =>{
        e.preventDefault()
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
                        onChange={e => setAmount(e.target.value)}
                    />
                </div>

                <button className="btn">Submit</button>

            </form>

            <button className="btn cancel_edit">Cancel Edit</button>
        </div>
    );
}
