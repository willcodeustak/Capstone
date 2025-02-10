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
	// const router = useRouter();

	const fetchBudgets = async () => {
		const { data, error } = await supabase
			.from('budgets')
			.select('*')
			.order('created_at', { ascending: true }); // Add this line

		if (error) {
			console.error('Error fetching budgets:', error);
		} else {
			setBudgets(data as Budget[]);
		}
	};

	const fetchTransactions = async () => {
		const { data, error } = await supabase.from('transactions').select('*');
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
		<div className="p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
			<Toaster position="top-right" />
			<h1 className="text-5xl font-extrabold text-gray-900 text-center mb-10">
				Budget Overview
			</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
				<div className="bg-white p-6 rounded-xl shadow-md">
					<h2 className="text-2xl font-semibold text-gray-700 mb-4">
						Create Budget
					</h2>
					<BudgetForm onBudgetAdded={onBudgetAdded} />
				</div>

				<div className="bg-white p-6 rounded-xl shadow-md">
					<h2 className="text-2xl font-semibold text-gray-700 mb-4">
						Add Transaction
					</h2>
					<TransactionsForm
						budgets={budgets}
						onTransactionsAdded={onTransactionsAdded}
					/>
				</div>
			</div>

			<div className="space-y-8">
				<div>
					<h2 className="text-3xl font-semibold text-gray-800 mb-6">
						Your Budgets
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{budgets.map((budget, index) => (
							<BudgetItem
								key={budget.id}
								budget={budget}
								onUpdate={fetchBudgets}
							/>
						))}
					</div>
				</div>

				<div>
					<h2 className="text-3xl font-semibold text-gray-800 mb-6">
						Transactions
					</h2>
					<Table
						transactions={transactions}
						budgets={budgets}
						onUpdate={handleTransactionsUpdate}
					/>
				</div>
			</div>
		</div>
	);
}
