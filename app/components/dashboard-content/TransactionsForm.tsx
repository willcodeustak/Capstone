import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Budget } from '../../types/budget';
import { Toaster, toast } from 'react-hot-toast';

interface TransactionsFormProps {
	budgets: Budget[]; // drop down

	onTransactionsAdded: (updatedBudgets: Budget[]) => void; //refresh budgets after adding a transaction
}

export default function TransactionsForm({
	budgets,
	onTransactionsAdded,
}: TransactionsFormProps) {
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
		const {
			data: { user },
		} = await supabase.auth.getUser();

		// console.log('Selected Budget ID (onSubmit):', selectedBudgetId);

		if (!selectedBudgetId) {
			console.error('No budget selected');
			alert('Please select a budget to add Transactions.');
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

		//update budget's
		const { error: budgetError } = await supabase
			.from('budgets')
			.update({ spent: newSpent })
			.eq('id', selectedBudgetId);

		if (budgetError) {
			alert('Error updating budget. Please try again.');

			return;
		}

		//update transactions
		const { error: transactionsError } = await supabase
			.from('transactions')
			.insert([
				{
					title,
					amount: Number(amount),
					budget_id: selectedBudgetId,
					user_id: user?.id,
					date: new Date().toISOString(),
				},
			]);

		if (transactionsError) {
			alert('Error adding Transactions. Please try again.');
			return;
		}

		// Update client-side state
		const updatedBudgets = budgets.map((budget) =>
			budget.id === selectedBudgetId ? { ...budget, spent: newSpent } : budget
		);
		toast.success('Transaction created 🎉', {
			className: 'text-xl p-4 min-w-[300px]',
		});
		onTransactionsAdded(updatedBudgets);

		// Reset form
		setTitle('');
		setAmount('');
	};

	// If there are no budgets, tell user they need to create a budget first before able to add a Transactions
	if (budgets.length === 0) {
		return (
			<div className="p-4 bg-yellow-100 rounded-lg text-yellow-800 ">
				Please create a budget first to add transactions.
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<input
				type="text"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="Transaction Title"
				className="border p-2 w-full "
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
				Add Transaction
			</button>
		</form>
	);
}
