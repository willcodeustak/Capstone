import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { TransactionsItemProps } from '@/app/types/transactions';

export default function TransactionsItem({
	transactions,
	budgets,
	onUpdate,
}: TransactionsItemProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [newTitle, setNewTitle] = useState(transactions.title);
	const [newAmount, setNewAmount] = useState(transactions.amount);
	const budget = budgets.find((budget) => budget.id === transactions.budget_id);

	//Update Transactions
	const handleUpdate = async () => {
		//difference in transactions amount
		const amountDifference = newAmount - transactions.amount;

		// Update the transaction in supa
		const { error: transactionsError } = await supabase
			.from('transactions')
			.update({ title: newTitle, amount: newAmount })
			.eq('id', transactions.id);

		if (transactionsError) {
			console.error('Error updating transactions:', transactionsError);
			return;
		}

		// Update budget's spent amount
		const selectedBudget = budgets.find((b) => b.id === transactions.budget_id);
		if (selectedBudget) {
			const newSpent = selectedBudget.spent + amountDifference;

			const { error: budgetError } = await supabase
				.from('budgets')
				.update({ spent: newSpent })
				.eq('id', selectedBudget.id);

			if (budgetError) {
				console.error('Error updating budget:', budgetError);
				return;
			}
		}

		// Refresh data
		onUpdate();
		setIsEditing(false); // Exit the edit state
	};

	//Delete transactions
	const handleDelete = async () => {
		//Update budget's spent amount
		const selectedBudget = budgets.find((b) => b.id === transactions.budget_id);
		if (selectedBudget) {
			const newSpent = selectedBudget.spent - transactions.amount;

			const { error: budgetError } = await supabase
				.from('budgets')
				.update({ spent: newSpent })
				.eq('id', selectedBudget.id);

			if (budgetError) {
				console.error('Error updating budget:', budgetError);
				return;
			}
		}

		//Delete spending
		const { error } = await supabase
			.from('transactions')
			.delete()
			.eq('id', transactions.id);

		if (error) {
			console.error('Error deleting transactions:', error);
			return;
		}

	
		onUpdate();
	};

	return (
		<tr>
			<td>
				{isEditing ? (
					<input
						type="text"
						value={newTitle}
						onChange={(e) => setNewTitle(e.target.value)}
						className="border p-1"
					/>
				) : (
					transactions.title
				)}
			</td>
			<td>
				{isEditing ? (
					<input
						type="number"
						value={newAmount}
						onChange={(e) => setNewAmount(Number(e.target.value))}
						className="border p-1"
					/>
				) : (
					`$${transactions.amount}`
				)}
			</td>
			<td>{new Date(transactions.date).toLocaleDateString()}</td>
			<td>
				{budget ? (
					<span className="text-gray-700">{budget.title}</span>
				) : (
					'No Budget'
				)}
			</td>
			<td>
				{isEditing ? (
					<button onClick={handleUpdate} className="text-green-500 mr-2">
						Save
					</button>
				) : (
					<button
						onClick={() => setIsEditing(true)}
						className="text-blue-500 mr-2"
					>
						Edit
					</button>
				)}
				<button onClick={handleDelete} className="text-red-500">
					Delete
				</button>
			</td>
		</tr>
	);
}
