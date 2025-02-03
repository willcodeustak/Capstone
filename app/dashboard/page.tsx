'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUser } from '../utils/auth';
import BudgetForm from '../components/dashboard-content/BudgetForm';
import BudgetItem from '../components/dashboard-content/BudgetItem';
import { supabase } from '../../lib/supabase';
import type { Budget } from '../types/budget';

//dashboard main
export default function DashboardPage() {
	const [budgets, setBudgets] = useState<Budget[]>([]);
	const [userId, setUserId] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		const checkUser = async () => {
			const user = await getUser();
			if (!user) {
				router.push('/signin');
			} else {
				setUserId(user.id);
				fetchBudgets(user.id);
			}
		};
		checkUser();
	}, [router]);

	const fetchBudgets = async (userId: string) => {
		const { data, error } = await supabase
			.from('budgets')
			.select('*')
			.eq('userId', userId);

		if (error) {
			console.error('Error fetching budgets:', error);
		} else {
			setBudgets(data || []);
		}
	};

	const handleCreateBudget = async (name: string, amount: number) => {
		if (!userId) {
			console.error('User not logged in');
			return;
		}

		try {
			const response = await fetch('/api/budget', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name, amount }),
			});

			if (response.ok) {
				const newBudget = await response.json();
				setBudgets([...budgets, newBudget]);
			} else {
				const errorData = await response.json();
				console.error('Failed to create budget:', errorData.error);
			}
		} catch (error) {
			console.error('An error occurred while creating the budget:', error);
		}
	};
	if (!userId) {
		return <div>Loading...</div>;
	}

	return (
		<div className="p-4">
			<h1 className="text-4xl font-bold mb-4">Dashboard</h1>
			<BudgetForm onSubmit={handleCreateBudget} />
			<div className="mt-8">
				<h2 className="text-xl font-semibold">Budgets</h2>
				<div className="grid gap-4 mt-4">
					{budgets.map((budget) => (
						<BudgetItem key={budget.id} budget={budget} />
					))}
				</div>
			</div>
		</div>
	);
}
