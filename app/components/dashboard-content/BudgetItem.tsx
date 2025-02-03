import type React from 'react';
import type { Budget } from '../../types/budget';

interface BudgetItemProps {
	budget: Budget;
}

const BudgetItem: React.FC<BudgetItemProps> = ({ budget }) => {
	return (
		<div className="border p-4 rounded-lg">
			<h3 className="text-xl font-semibold">{budget.name}</h3>
			<p className="text-lg">Amount: ${budget.amount.toFixed(2)}</p>
		</div>
	);
};

export default BudgetItem;
