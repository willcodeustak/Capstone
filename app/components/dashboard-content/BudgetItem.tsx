import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Budget } from '../../types/budget';
import { useConfirmDelete } from '../../hooks/useConfirmDelete';
import { toast } from 'react-hot-toast';
const BUDGET_COLORS = [
	'border-blue-500',
	'border-green-500',
	'border-yellow-500',
	'border-red-500',
	'border-purple-500',
	'border-pink-500',
	'border-indigo-500',
	'border-teal-500',
];

const PROGRESS_COLORS = [
	'bg-blue-500',
	'bg-green-500',
	'bg-yellow-500',
	'bg-red-500',
	'bg-purple-500',
	'bg-pink-500',
	'bg-indigo-500',
	'bg-teal-500',
];
interface BudgetItemProps {
	budget: Budget;
	onUpdate: () => void; //refresh budgets after update or delete
}

export default function BudgetItem({ budget, onUpdate }: BudgetItemProps) {
	const [title, setTitle] = useState(budget.title);
	const [amount, setAmount] = useState(budget.amount);
	const [isEditing, setIsEditing] = useState(false);
	const { confirmDelete } = useConfirmDelete();

	const colorIndex = budget.id.charCodeAt(1) % BUDGET_COLORS.length;
	const borderColor = BUDGET_COLORS[colorIndex];
	const progressColor = PROGRESS_COLORS[colorIndex];

	//budget update
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
				// toast.success('Budget deleted successfully');
			} else {
				toast.error('Failed to delete budget');
			}
		});
	};
	const percentSpent = (budget.spent || 0) / budget.amount;
	const isOverBudget = percentSpent > 1;

	return (
		<div
			className={`p-6 rounded-lg shadow-md mb-4 border-4 ${borderColor} border-opacity-50`}
		>
			{isEditing ? (
				<div className="space-y-2">
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="border p-2 w-full"
					/>
					<input
						type="number"
						value={amount}
						onChange={(e) => setAmount(Number(e.target.value))}
						className="border p-2 w-full"
					/>
					<div className="flex space-x-2">
						<button
							onClick={handleUpdate}
							className="bg-green-500 text-white px-4 py-2"
						>
							Save
						</button>
						<button
							onClick={() => setIsEditing(false)}
							className="bg-gray-500 text-white px-4 py-2"
						>
							Cancel
						</button>
					</div>
				</div>
			) : (
				<div>
					<h2 className="text-2xl font-bold mb-2">{budget.title}</h2>
					<div className="flex justify-between text-lg mb-2">
						<span className="font-bold">
							Spent: ${(budget.spent || 0).toFixed(2)}
						</span>
						<span className="font-bold">
							Budget: ${budget.amount.toFixed(2)}
						</span>
					</div>

					{/* Progress Bar */}
					<div className="w-full bg-gray-200 rounded-full h-4 mb-2">
						<div
							className={`h-4 rounded-full ${progressColor}`}
							style={{
								width: `${Math.min(
									100,
									((budget.spent || 0) / budget.amount) * 100
								)}%`,
							}}
						></div>
					</div>

					<div className="flex text-lg mb-4 justify-end">
						<span
							className={`font-bold ${
								isOverBudget ? 'text-red-500' : 'text-green-500'
							}`}
						>
							${(budget.amount - (budget.spent || 0)).toFixed(2)}
							<span className="font-bold">{'     '}Remaining</span>
						</span>
					</div>

					<div className="flex gap-2">
						<button
							onClick={() => setIsEditing(!isEditing)}
							className="text-gray-600 hover:text-gray-800"
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
