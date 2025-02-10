'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { TransactionsItemProps } from '@/app/types/transactions';
import { useConfirmDelete } from '../../hooks/useConfirmDelete';
import { toast } from 'react-hot-toast';

export default function TransactionsItem({
	transactions,
	budgets,
	onUpdate,
	budgetColor,
}: TransactionsItemProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [newTitle, setNewTitle] = useState(transactions.title);
	const [newAmount, setNewAmount] = useState(transactions.amount);
	const budget = budgets.find((budget) => budget.id === transactions.budget_id);
	const { confirmDelete } = useConfirmDelete();

	const handleUpdate = async () => {
		const amountDifference = newAmount - transactions.amount;

		const { error: transactionsError } = await supabase
			.from('transactions')
			.update({ title: newTitle, amount: newAmount })
			.eq('id', transactions.id);

		if (transactionsError) {
			console.error('Error updating transactions:', transactionsError);
			toast.error('Failed to update transaction');
			return;
		}

		const selectedBudget = budgets.find((b) => b.id === transactions.budget_id);
		if (selectedBudget) {
			const newSpent = selectedBudget.spent + amountDifference;

			const { error: budgetError } = await supabase
				.from('budgets')
				.update({ spent: newSpent })
				.eq('id', selectedBudget.id);

			if (budgetError) {
				console.error('Error updating budget:', budgetError);
				toast.error('Failed to update budget');
				return;
			}
		}

		onUpdate();
		setIsEditing(false);
		toast.success('Transaction updated successfully');
	};

	const handleDelete = async () => {
		confirmDelete(
			'Are you sure you want to delete this transaction?',
			async () => {
				const selectedBudget = budgets.find(
					(b) => b.id === transactions.budget_id
				);
				if (selectedBudget) {
					const newSpent = selectedBudget.spent - transactions.amount;

					const { error: budgetError } = await supabase
						.from('budgets')
						.update({ spent: newSpent })
						.eq('id', selectedBudget.id);

					if (budgetError) {
						console.error('Error updating budget:', budgetError);
						toast.error('Failed to update budget');
						return;
					}
				}

				const { error } = await supabase
					.from('transactions')
					.delete()
					.eq('id', transactions.id);

				if (error) {
					console.error('Error deleting transactions:', error);
					toast.error('Failed to delete transaction');
					return;
				}

				onUpdate();
				toast.success('Transaction deleted successfully');
			}
		);
	};

	return (
		<tr>
			<td className="px-6 py-4 whitespace-nowrap">
				{isEditing ? (
					<input
						type="text"
						value={newTitle}
						onChange={(e) => setNewTitle(e.target.value)}
						className="border rounded px-2 py-1 w-full"
					/>
				) : (
					transactions.title
				)}
			</td>
			<td className="px-6 py-4 whitespace-nowrap">
				{isEditing ? (
					<input
						type="number"
						value={newAmount}
						onChange={(e) => setNewAmount(Number(e.target.value))}
						className="border rounded px-2 py-1 w-full"
					/>
				) : (
					`$${transactions.amount.toFixed(2)}`
				)}
			</td>
			<td className="px-6 py-4 whitespace-nowrap">
				{new Date(transactions.date).toLocaleDateString()}
			</td>
			<td className="px-6 py-4 whitespace-nowrap">
				{budget ? (
					<span className={`px-2 py-1 rounded ${budgetColor} text-white`}>
						{budget.title}
					</span>
				) : (
					'Budget deleted'
				)}
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
				{isEditing ? (
					<>
						<button
							onClick={handleUpdate}
							className="text-green-600 hover:text-green-900 mr-2"
						>
							Save
						</button>
						<button
							onClick={() => setIsEditing(false)}
							className="text-gray-600 hover:text-gray-900"
						>
							Cancel
						</button>
					</>
				) : (
					<>
						<button
							onClick={() => setIsEditing(true)}
							className="text-blue-600 hover:text-blue-900 mr-2"
						>
							Edit
						</button>
						<button
							onClick={handleDelete}
							className="text-red-600 hover:text-red-900"
						>
							Delete
						</button>
					</>
				)}
			</td>
		</tr>
	);
}
