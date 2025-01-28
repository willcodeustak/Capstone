import { useState } from 'react';

const ExpenseForm = ({
	budgets,
	onSubmit,
}: {
	budgets: any[];
	onSubmit: (name: string, amount: number, budgetId: number) => void;
}) => {
	const [name, setName] = useState('');
	const [amount, setAmount] = useState('');
	const [budgetId, setBudgetId] = useState(budgets[0]?.id || '');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(name, parseFloat(amount), parseInt(budgetId));
		setName('');
		setAmount('');
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<label
					htmlFor="name"
					className="block text-sm font-medium text-gray-700"
				>
					Expense Name
				</label>
				<input
					type="text"
					id="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					required
				/>
			</div>
			<div>
				<label
					htmlFor="amount"
					className="block text-sm font-medium text-gray-700"
				>
					Amount
				</label>
				<input
					type="number"
					id="amount"
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					required
				/>
			</div>
			<div>
				<label
					htmlFor="budgetId"
					className="block text-sm font-medium text-gray-700"
				>
					Budget Category
				</label>
				<select
					id="budgetId"
					value={budgetId}
					onChange={(e) => setBudgetId(e.target.value)}
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					required
				>
					{budgets.map((budget) => (
						<option key={budget.id} value={budget.id}>
							{budget.name}
						</option>
					))}
				</select>
			</div>
			<button
				type="submit"
				className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
			>
				Add Expense
			</button>
		</form>
	);
};

export default ExpenseForm;
