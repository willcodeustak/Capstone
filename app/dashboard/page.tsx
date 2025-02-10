'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BudgetForm from '../components/dashboard-content/BudgetForm';
import BudgetItem from '../components/dashboard-content/BudgetItem';
import TransactionsForm from '../components/dashboard-content/TransactionsForm';
import { supabase } from '@/lib/supabase';
import { Budget } from '../types/budget';
import Table from '../components/dashboard-content/Table';

export default function DashboardPage() {
	const [budgets, setBudgets] = useState<Budget[]>([]);
	const [transactions, setTransactions] = useState<any[]>([]);
	const router = useRouter();

	// Fetch budgets and transactions
	const fetchBudgets = async () => {
		const { data, error } = await supabase.from('budgets').select('*');
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

	// Handle new budget creation
	const onBudgetAdded = (newBudget: Budget) => {
		setBudgets((prevBudgets) => [...prevBudgets, newBudget]);
	};

	// Handle new transactions creation
	const onTransactionsAdded = (updatedBudgets: Budget[]) => {
		setBudgets(updatedBudgets);
		fetchTransactions();
	};

	// Handle transactions updates or deletions
	const handleTransactionsUpdate = () => {
		fetchBudgets(); // Refresh budgets to update the spent amount
		fetchTransactions(); // Refresh transactions to update the table
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
					<BudgetItem key={budget.id} budget={budget} onUpdate={fetchBudgets} />
				))}
			</div>

			{/* transactions Section */}
			<div className="mt-12">
				<h2 className="text-3xl font-semibold text-gray-800 mb-6">
					Transactions
				</h2>
				<TransactionsForm
					budgets={budgets}
					onTransactionsAdded={onTransactionsAdded}
				/>
				<Table
					transactions={transactions}
					budgets={budgets}
					onUpdate={handleTransactionsUpdate}
				/>
			</div>
		</div>
	);
}
