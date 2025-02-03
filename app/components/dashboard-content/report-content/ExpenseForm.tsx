'use client';

import { useState } from 'react';
import type { Expense } from '../../../types/expense';

const categories = [
	'Food & Dining',
	'Transportation',
	'Entertainment',
	'Housing',
	'Utilities',
	'Healthcare',
	'Personal',
	'Education',
	'Shopping',
	'Other',
];

interface ExpenseFormProps {
	onAddExpense: (expense: Expense) => void;
}

// ExpenseForm component
export default function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
	const [amount, setAmount] = useState<string>('');
	const [category, setCategory] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [date, setDate] = useState<string>(
		new Date().toISOString().slice(0, 16)
	); // year-month-date format

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (amount && category && date) {
			onAddExpense({
				id: Date.now().toString(),
				amount: Number.parseFloat(amount),
				category,
				description,
				date: new Date(date).toISOString(),
			});
			// Reset form fields after submission
			setAmount('');
			setCategory('');
			setDescription('');
			setDate(new Date().toISOString().slice(0, 16));
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4 mb-6">
			<input
				type="number"
				placeholder="Amount"
				value={amount}
				onChange={(e) => setAmount(e.target.value)}
				required
				className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
			/>
			<select
				value={category}
				onChange={(e) => setCategory(e.target.value)}
				required
				className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
			>
				<option value="">Select category</option>
				{categories.map((cat) => (
					<option key={cat} value={cat}>
						{cat}
					</option>
				))}
			</select>
			<input
				type="text"
				placeholder="Description (optional)"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
			/>
			<input
				type="datetime-local"
				value={date}
				onChange={(e) => setDate(e.target.value)}
				required
				className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
			/>
			<button
				type="submit"
				className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			>
				Add Expense
			</button>
		</form>
	);
}
