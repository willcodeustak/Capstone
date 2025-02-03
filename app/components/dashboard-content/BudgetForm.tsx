import { useState } from 'react';

interface BudgetFormProps {
	onSubmit: (name: string, amount: number) => Promise<void>;
}

const BudgetForm = ({ onSubmit }: BudgetFormProps) => {
	const [name, setName] = useState('');
	const [amount, setAmount] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!name || !amount) {
			setError('Please provide both name and amount');
			return;
		}

		try {
			await onSubmit(name, parseFloat(amount)); // Call the onSubmit function passed as a prop

			setSuccess(`Budget created successfully: ${name}`);
			setName('');
			setAmount('');
		} catch (err) {
			setError('An error occurred while creating the budget');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="name">Budget Name</label>
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
				<label htmlFor="amount">Amount</label>
				<input
					type="number"
					id="amount"
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					required
					min="0"
					step="0.01"
				/>
			</div>
			{error && <div>{error}</div>}
			{success && <div>{success}</div>}
			<button
				type="submit"
				className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
			>
				Create Budget
			</button>
		</form>
	);
};

export default BudgetForm;
