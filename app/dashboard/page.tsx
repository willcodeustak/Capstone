// DashboardPage (page.tsx)
'use client';

import { useEffect, useState } from 'react';

const DashboardPage = () => {
	const [budgets, setBudgets] = useState<any[]>([]);
	const [name, setName] = useState('');
	const [amount, setAmount] = useState('');
	const [userId, setUserId] = useState<number | null>(null); // Store logged-in user's ID

	useEffect(() => {
		fetchUserId(); // Fetch user ID first
		fetchBudgets();
	}, []);

	// dummy data function to get user ID (replace with actual auth logic)
	const fetchUserId = async () => {
		const response = await fetch('/api/auth/me'); // non working dummy fetch
		const data = await response.json();
		setUserId(data.id);
	};

	const fetchBudgets = async () => {
		const response = await fetch('/api/budget');
		const data = await response.json();
		setBudgets(data);
	};

	const handleCreateBudget = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!userId) {
			console.error('User not logged in');
			return;
		}

		const response = await fetch('/api/budget', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name, amount, userId }),
		});

		if (!response.ok) {
			console.error('Failed to create budget');
			return;
		}

		const newBudget = await response.json();
		setBudgets([...budgets, newBudget]);
		setName('');
		setAmount('');
	};

	return (
		<div className="p-4">
			<h1 className="text-4xl font-bold mb-4">Dashboard</h1>
			<form onSubmit={handleCreateBudget} className="space-y-4">
				<div>
					<label
						htmlFor="name"
						className="block text-md font-medium text-gray-700"
					>
						Budget Name
					</label>
					<input
						type="text"
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="mt-1 block w-full h-12 rounded-md border-gray-300 shadow-sm"
						required
					/>
				</div>
				<div>
					<label
						htmlFor="amount"
						className="block text-md font-medium text-gray-700"
					>
						Amount
					</label>
					<input
						type="number"
						id="amount"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						className="mt-1 block w-full h-12 rounded-md border-gray-300 shadow-sm"
						required
					/>
				</div>
				<button
					type="submit"
					className="inline-flex justify-center rounded-md border bg-indigo-600 text-white py-2 px-4"
				>
					Create Budget
				</button>
			</form>
			<div className="mt-8">
				<h2 className="text-xl font-semibold">Budgets</h2>
				<ul>
					{budgets.map((budget) => (
						<li key={budget.id} className="border p-4 rounded-md mt-2">
							<p>Name: {budget.name}</p>
							<p>Amount: ${budget.amount}</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default DashboardPage;
