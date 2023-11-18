import { useSelector } from "react-redux";

export default function Balance() {

    const { transactions } = useSelector(state => state.transaction);

    return (
        <div className="top_card">
            <p>Your Current Balance</p>
            <h3>
                <span>৳</span>{" "}
                <span>
                    {
                        transactions.reduce((acc, curr) => {
                            return curr.type === "income" ? acc + curr.amount : acc - curr.amount;
                        }, 0).toLocaleString()
                    }

                </span>
            </h3>
        </div>
    );
}
