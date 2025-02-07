import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Budget } from '../../types/budget';

interface SpendingFormProps {
	budgets: Budget[]; // drop down for list of budgets to select from
	onSpendingAdded: (updatedBudgets: Budget[]) => void; // Callback to refresh budgets after adding a spending
}

export default function SpendingForm({
	budgets,
	onSpendingAdded,
}: SpendingFormProps) {
	const [title, setTitle] = useState('');
	const [amount, setAmount] = useState('');
	const [selectedBudgetId, setSelectedBudgetId] = useState('');

	useEffect(() => {
		if (budgets.length > 0) {
			// console.log('Budgets:', budgets);
			setSelectedBudgetId(budgets[0].id); // default to first budget
		}
	}, [budgets]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		// console.log('Selected Budget ID (onSubmit):', selectedBudgetId);

		if (!selectedBudgetId) {
			console.error('No budget selected');
			alert('Please select a budget to add spending.');
			return;
		}

		//search for budget within supa table
		const selectedBudget = budgets.find(
			(budget) => budget.id === selectedBudgetId
		);

		if (!selectedBudget) {
			// console.error('Selected budget not found');
			// console.log('Selected Budget ID:', selectedBudgetId);
			// console.log('Budgets:', budgets);
			alert('Selected budget not found. Please try again.');
			return;
		}
		const newSpent = (selectedBudget.spent || 0) + Number(amount);

		// Update budget's spent amount in supa database
		const { error } = await supabase
			.from('budgets')
			.update({ spent: newSpent })
			.eq('id', selectedBudgetId);

		if (error) {
			// console.error('Error updating budget:', error);
			alert('Error updating budget. Please try again.');
		} else {
			//client side state
			const updatedBudgets = budgets.map((budget) =>
				budget.id === selectedBudgetId
					? { ...budget, spent: newSpent } // updates the spent value for the selected budget
					: budget
			);
			onSpendingAdded(updatedBudgets); // Pass the updated budgets to the parent/main component

			// Reset
			setTitle('');
			setAmount('');
		}
	};

	// If there are no budgets, tell user they need to create a budget first before able to add a spending
	if (budgets.length === 0) {
		return (
			<div className="p-4 bg-yellow-100 rounded-lg text-yellow-800">
				Please create a budget first to add spending.
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<input
				type="text"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="Spending Title"
				className="border p-2 w-full"
				required
			/>
			<input
				type="number"
				value={amount}
				onChange={(e) => setAmount(e.target.value)}
				placeholder="Amount"
				className="border p-2 w-full"
				required
			/>
			<select
				value={selectedBudgetId}
				onChange={(e) => {
					// console.log('selected budget:', e.target.value);
					setSelectedBudgetId(e.target.value);
				}}
				className="border p-2 w-full"
				required
			>
				{budgets.map((budget) => (
					<option key={budget.id} value={budget.id}>
						{budget.title}
					</option>
				))}
			</select>
			<button type="submit" className="bg-blue-500 text-white px-4 py-2">
				Add Spending
			</button>
		</form>
	);
}
