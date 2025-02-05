import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Budget } from '../../types/budget';

interface BudgetFormProps {
	onBudgetAdded: (newBudget: Budget) => void;
}

export default function BudgetForm({ onBudgetAdded }: BudgetFormProps) {
	const [title, setTitle] = useState('');
	const [amount, setAmount] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const { data, error } = await supabase
			.from('budgets')
			.insert([{ title, amount }])
			.select()
			.single();

		if (error) {
			console.error('Error adding budget:', error);
		} else if (data) {
			onBudgetAdded(data);
			setTitle('');
			setAmount('');
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<input
				type="text"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="Budget Name"
				className="border p-2 w-full"
			/>
			<input
				type="number"
				value={amount}
				onChange={(e) => setAmount(e.target.value)}
				placeholder="Amount"
				className="border p-2 w-full"
			/>
			<button type="submit" className="bg-blue-500 text-white px-4 py-2">
				Create Budget
			</button>
		</form>
	);
}
