import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTransaction, createTransaction, removeTransaction } from "../features/transaction/transactionSlice";

export default function Form() {

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [amount, setAmount] = useState(0);
    const [editMode, setEditMode] = useState();
    const dispatch = useDispatch();
    const { isLoading, isError, editing } = useSelector(state => state.transaction);

    useEffect(() => {
        const { id, name, type, amount } = editing || {};
        if (id) {
            setEditMode(true);
            setName(name);
            setType(type);
            setAmount(amount);
        } else {
            resetForm();
        }
    }, [editing]);

    const handleCreate = (e) => {
        e.preventDefault()
        dispatch(createTransaction({
            name,
            type,
            amount: Number(amount)
        }));
        resetForm();
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(changeTransaction({
            id: editing.id,
            data: {
                name,
                type,
                amount: Number(amount)
            }
        }));
        setEditMode(false);
        resetForm();
    }

    const resetForm = () => {
        setName("");
        setType("");
        setAmount(0);
    }

    const cancleEditMode = () => {
        resetForm();
        setEditMode(false);
    }


    return (
        <div className="form">
            <h3>Add new transaction</h3>

            <form onSubmit={editMode ? handleUpdate : handleCreate}>
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
                    <label >Amount</label>
                    <input
                        type="number"
                        placeholder="Enter amount..."
                        name="amount"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                    />
                </div>

                <button disabled={isLoading} className="btn">
                    {
                        editMode ? "Update Transaction" : "Add Transaction"
                    }
                </button>

            </form>
            {
                isError &&
                <p className="error">There Was an error occerd</p>
            }

            {
                editMode &&
                <button className="btn cancel_edit" onClick={cancleEditMode}>Cancel Edit</button>
            }

        </div>
    );
}
