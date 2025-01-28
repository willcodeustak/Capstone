const BudgetItem = ({
	budget,
}: {
	budget: { id: number; name: string; amount: number };
}) => {
	return (
		<div className="border p-4 rounded-lg">
			<h3 className="text-xl font-semibold">{budget.name}</h3>
			<p className="text-lg">Amount: ${budget.amount}</p>
		</div>
	);
};

export default BudgetItem;
