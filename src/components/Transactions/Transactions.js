import { useDispatch, useSelector } from "react-redux";
import Transaction from "./Transaction";
import { useEffect } from "react";
import { fetchTransactions } from "../../features/transaction/transactionSlice";

export default function Transactions() {

    const { transactions, isLoading, isError, error } = useSelector(state => state.transaction)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(fetchTransactions())
    }, [dispatch])

    let content = null;

    if (isLoading) content = <p>Loading...</p>
    if (!isLoading && isError) content = <p className="error">There was an error occared</p>

    if (!isLoading && !isError && transactions.length === 0) content = <p className="no_transaction">No transaction found</p>

    if (!isLoading && !isError && transactions.length > 0) {
        content = transactions.map((transaction) => (
            <Transaction key={transaction.id} transaction={transaction} />
        ));
    }

    return (
        <>
            <p className="second_heading">Your Transactions:</p>

            <div className="conatiner_of_list_of_transactions">
                <ul>
                    {content}
                </ul>
            </div>
        </>
    );
}
