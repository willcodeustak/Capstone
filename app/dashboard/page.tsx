'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BudgetForm from '../components/dashboard-content/BudgetForm';
import BudgetItem from '../components/dashboard-content/BudgetItem';
import SpendingForm from '../components/dashboard-content/SpendingForm';
import { supabase } from '@/lib/supabase';
import { Budget } from '../types/budget';

export default function DashboardPage() {
	const [budgets, setBudgets] = useState<Budget[]>([]);
	const router = useRouter();

	// Fetch budgets table from supa database
	const fetchBudgets = async () => {
		const { data, error } = await supabase.from('budgets').select('*');
		if (error) {
			console.error('Error fetching budgets:', error);
		} else {
			setBudgets(data as Budget[]);
		}
	};

	useEffect(() => {
		fetchBudgets();
	}, []);

	//new budget creation
	const onBudgetAdded = (newBudget: Budget) => {
		setBudgets((prevBudgets) => [...prevBudgets, newBudget]);
	};


	const onSpendingAdded = (updatedBudgets: Budget[]) => {
		setBudgets(updatedBudgets); // Update the budgets state with the new data (spending)
	};

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
					<BudgetItem
						key={budget.id}
						budget={budget} 
						onUpdate={fetchBudgets}
					/>
				))}
			</div>

			{/* Spendings Section */}
			<div className="mt-12">
				<h2 className="text-3xl font-semibold text-gray-800 mb-6">Spendings</h2>
				<SpendingForm budgets={budgets} onSpendingAdded={onSpendingAdded} />
			</div>
		</div>
	);
}
