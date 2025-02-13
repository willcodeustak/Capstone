import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Budget } from '../../types/budget';
import { useConfirmDelete } from '../../hooks/useConfirmDelete';
import { toast } from 'react-hot-toast';
import { getBudgetColor } from '../../utils/colors';

interface BudgetItemProps {
	budget: Budget;
	index: number;
	onUpdate: () => void;
}

export default function BudgetItem({
	budget,
	index,
	onUpdate,
}: BudgetItemProps) {
	const [title, setTitle] = useState(budget.title);
	const [amount, setAmount] = useState(budget.amount);
	const [isEditing, setIsEditing] = useState(false);
	const { confirmDelete } = useConfirmDelete();

	// Apply unique color based on index
	const { borderColor, bgColor } = getBudgetColor(index);

	const handleUpdate = async () => {
		const { error } = await supabase
			.from('budgets')
			.update({ title, amount })
			.eq('id', budget.id);

		if (error) {
			console.error('Error updating budget:', error);
		} else {
			setIsEditing(false);
			onUpdate();
			toast.success('Budget updated successfully');
		}
	};

	const handleDelete = () => {
		confirmDelete('Delete this budget?', async () => {
			const { error } = await supabase
				.from('budgets')
				.delete()
				.eq('id', budget.id);

			if (!error) {
				onUpdate();
			} else {
				toast.error('Failed to delete budget');
			}
		});
	};

	const percentSpent = (budget.spent || 0) / budget.amount;
	const isOverBudget = percentSpent > 1;

	return (
		<div
			className={`p-6 rounded-lg shadow-md mb-4 border-4 ${borderColor} border-opacity-50 dark:text-white`}
		>
			{isEditing ? (
				<div className="space-y-2 dark:text-black">
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="border p-2 w-full bg-gray-300 dark:text-black"
					/>
					<input
						type="number"
						value={amount}
						onChange={(e) => setAmount(Number(e.target.value))}
						className="border p-2 w-full bg-gray-300 dark:text-black"
					/>
					<div className="flex space-x-2 dark:bg-gray-700">
						<button
							onClick={handleUpdate}
							className="bg-green-500 text-white px-4 py-2"
						>
							Save
						</button>
						<button
							onClick={() => setIsEditing(false)}
							className="bg-gray-500 text-white px-4 py-2 "
						>
							Cancel
						</button>
					</div>
				</div>
			) : (
				<div>
					<div className="flex items-center justify-between mb-2">
						<h2 className="text-2xl font-bold break-words max-w-[70%]">
							{budget.title}
						</h2>
						<span className="font-bold whitespace-nowrap">
							Budget: ${budget.amount.toFixed(2)}
						</span>
					</div>

					{/* Progress Bar */}
					<div className="w-full bg-gray-200 rounded-full h-4 mb-2">
						<div
							className={`h-4 rounded-full ${bgColor}`}
							style={{
								width: `${Math.min(
									100,
									((budget.spent || 0) / budget.amount) * 100
								)}%`,
							}}
						></div>
					</div>

					<div className="flex text-lg mb-4 justify-between">
						<span className="font-bold">
							${(budget.spent || 0).toFixed(2)} Spent
						</span>
						<span
							className={`font-bold ${
								isOverBudget ? 'text-red-500' : 'text-green-500'
							}`}
						>
							${(budget.amount - (budget.spent || 0)).toFixed(2)} Remaining
						</span>
					</div>

					<div className="flex gap-2">
						<button
							onClick={() => setIsEditing(!isEditing)}
							className="text-gray-600 hover:text-gray-800 dark:text-white"
						>
							{isEditing ? 'Cancel' : 'Edit'}
						</button>
						<button
							onClick={handleDelete}
							className="text-red-600 hover:text-red-800"
						>
							Delete
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
