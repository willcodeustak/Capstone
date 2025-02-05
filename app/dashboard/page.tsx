'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BudgetForm from '../components/dashboard-content/BudgetForm';
import BudgetList from '../components/dashboard-content/BudgetList';
import { supabase } from '@/lib/supabase';
import { Budget } from '../types/budget';

export default function DashboardPage() {
	const [budgets, setBudgets] = useState<Budget[]>([]);
	const router = useRouter();

	useEffect(() => {
		const fetchBudgets = async () => {
			const { data, error } = await supabase.from('budgets').select('*');
			if (error) {
				console.error('Error fetching budgets:', error);
			} else {
				setBudgets(data as Budget[]);
			}
		};
		fetchBudgets();
	}, []);

	const onBudgetAdded = (newBudget: Budget) => {
		setBudgets((prevBudgets) => [...prevBudgets, newBudget]);
	};

	// 	return (
	// 		<div className="p-4">
	// 			<h1 className="text-4xl font-bold mb-4">Dashboard</h1>
	// 			<BudgetForm onBudgetAdded={onBudgetAdded} />
	// 			<div className="mt-8">
	// 				<h2 className="text-xl font-semibold">Budgets</h2>
	// 				<BudgetList budgets={budgets} />
	// 			</div>
	// 		</div>
	// 	);
	// }

	return (
		<div className="p-8 max-w-5xl mx-auto bg-gray-50 min-h-screen">
			<h1 className="text-5xl font-extrabold text-gray-900 text-center mb-10">
				Budget Overview
			</h1>
			{/* Budget Section */}
			<div className="bg-white p-6 rounded-xl shadow-md mb-8">
				<h2 className="text-2xl font-semibold text-gray-700 mb-4">
					Create Budget
				</h2>
				<BudgetForm onBudgetAdded={onBudgetAdded} />
			</div>

			{/* Budget List */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{budgets.map((budget) => (
					<div
						key={budget.id}
						className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
					>
						<h2 className="text-xl font-bold text-gray-800">{budget.title}</h2>
						<p className="text-gray-600 text-lg mt-1">${budget.amount}</p>
						<div className="w-full bg-gray-200 rounded-full h-4 mt-4">
							<div
								className="bg-blue-500 h-4 rounded-full"
								style={{
									width: `${Math.min(
										100,
										(budget.spent / budget.amount) * 100 //spent down the line
									)}%`,
								}}
							></div>
						</div>
					</div>
				))}
			</div>

			{/* Expenses Section */}
			<div className="mt-12">
				<h2 className="text-3xl font-semibold text-gray-800 mb-6">Expenses</h2>
			</div>
		</div>
	);
}
