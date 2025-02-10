import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Budget } from '../../types/budget';

interface BudgetItemProps {
	budget: Budget;
	onUpdate: () => void; //refresh budgets after update or delete
}

export default function BudgetItem({ budget, onUpdate }: BudgetItemProps) {
	const [title, setTitle] = useState(budget.title);
	const [amount, setAmount] = useState(budget.amount);
	const [isEditing, setIsEditing] = useState(false);

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
		}
	};

	//budget delete
	const handleDelete = async () => {
		const { error } = await supabase
			.from('budgets')
			.delete()
			.eq('id', budget.id);

		if (error) {
			console.error('Error deleting budget:', error);
		} else {
			onUpdate();
		}
	};

	return (
		<div className="p-4 bg-white rounded-lg shadow-md mb-2">
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
					<h2 className="text-lg font-semibold">{budget.title}</h2>
					<p className="text-gray-600">Budget: ${budget.amount}</p>
					<p className="text-gray-600">Spent: ${budget.spent || 0}</p>
					{/* Progress Bar */}
					<div className="w-full bg-gray-200 rounded-full h-4 mt-4">
						<div
							className="bg-blue-500 h-4 rounded-full"
							style={{
								width: `${Math.min(
									100,
									((budget.spent || 0) / budget.amount) * 100
								)}%`,
							}}
						></div>
					</div>
					<p className="text-gray-600">Spent: ${budget.spent || 0}</p>
					<div className="flex space-x-2 mt-2">
						<button
							onClick={() => setIsEditing(true)}
							className="bg-blue-500 text-white px-4 py-2"
						>
							Edit
						</button>
						<button
							onClick={handleDelete}
							className="bg-red-500 text-white px-4 py-2"
						>
							Delete
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
