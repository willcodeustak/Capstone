'use client';

import { useEffect, useState } from 'react';
import BudgetForm from '../components/dashboard-content/BudgetForm';
import BudgetItem from '../components/dashboard-content/BudgetItem';
import TransactionsForm from '../components/dashboard-content/TransactionsForm';
import { supabase } from '@/lib/supabase';
import type { Budget } from '../types/budget';
import Table from '../components/dashboard-content/Table';
import { Toaster } from 'react-hot-toast';

export default function DashboardPage() {
	const [budgets, setBudgets] = useState<Budget[]>([]);
	const [transactions, setTransactions] = useState<any[]>([]);

	const fetchBudgets = async () => {
		const { data, error } = await supabase
			.from('budgets')
			.select('*')
			.order('created_at', { ascending: true });

		if (error) {
			console.error('Error fetching budgets:', error);
		} else {
			setBudgets(data as Budget[]);
		}
	};

	const fetchTransactions = async () => {
		const { data, error } = await supabase
			.from('transactions')
			.select('*')
			.order('date', { ascending: false }); // Sort by date in descending order

		if (error) {
			console.error('Error fetching transactions:', error);
		} else {
			setTransactions(data);
		}
	};
	useEffect(() => {
		fetchBudgets();
		fetchTransactions();
	}, []);

	const onBudgetAdded = (newBudget: Budget) => {
		setBudgets((prevBudgets) => [...prevBudgets, newBudget]);
	};

	const onTransactionsAdded = (updatedBudgets: Budget[]) => {
		setBudgets(updatedBudgets);
		fetchTransactions();
	};

	const handleTransactionsUpdate = () => {
		fetchBudgets();
		fetchTransactions();
	};

	return (
		<>
			<Toaster position="top-center" />
			<h1 className="text-5xl font-extrabold text-gray-900 text-center mb-10 dark:text-white">
				Budget Overview
			</h1>

			{/* Budget and Transaction Forms */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 max-w-4xl mx-auto">
				<div className="bg-white p-6 rounded-xl shadow-md dark:bg-gray-700">
					<h2 className="text-2xl font-semibold text-gray-700 mb-4 dark:text-white">
						Create Budget
					</h2>
					<BudgetForm onBudgetAdded={onBudgetAdded} />
				</div>

				<div className="bg-white p-6 rounded-xl shadow-md dark:bg-gray-700">
					<h2 className="text-2xl font-semibold text-gray-700 mb-4 dark:text-white">
						Add Transaction
					</h2>
					<TransactionsForm
						budgets={budgets}
						onTransactionsAdded={onTransactionsAdded}
					/>
				</div>
			</div>

			{/* Budgets Section */}
			<div className="space-y-8">
				<div>
					<h2 className="text-3xl font-semibold text-gray-800 mb-6 dark:text-white">
						Your Budgets
					</h2>
					<div className="w-full">
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{budgets.map((budget) => (
								<div key={budget.id}>
									<BudgetItem budget={budget} onUpdate={fetchBudgets} />
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Transactions Section */}
				<div>
					<h2 className="text-3xl font-semibold text-gray-800 mb-6 dark:text-white">
						Transactions
					</h2>
					<Table
						transactions={transactions}
						budgets={budgets}
						onUpdate={handleTransactionsUpdate}
					/>
				</div>
			</div>
		</>
	);
}
