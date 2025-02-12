'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import ExpenseChart from '../../components/dashboard-content/report-content/ExpenseChart';
import { Toaster } from 'react-hot-toast';
import type { Budget } from '../../types/budget';

export default function Reports() {
	const [transactions, setTransactions] = useState<any[]>([]);
	const [budgets, setBudgets] = useState<Budget[]>([]);
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());

	useEffect(() => {
		const fetchData = async () => {
			const { data: transactionsData } = await supabase
				.from('transactions')
				.select('*');

			const { data: budgetsData } = await supabase
				.from('budgets')
				.select('*')
				.order('created_at', { ascending: true });

			setTransactions(transactionsData || []);
			setBudgets(budgetsData || []);
		};
		fetchData();
	}, []);

	const filterTransactionsByPeriod = (period: 'day' | 'week' | 'month') => {
		const date = new Date(selectedDate);
		return transactions.filter((transaction) => {
			const transDate = new Date(transaction.date);
			switch (period) {
				case 'day':
					return transDate.toDateString() === date.toDateString();
				case 'week':
					const weekStart = new Date(date);
					weekStart.setDate(date.getDate() - date.getDay());
					const weekEnd = new Date(weekStart);
					weekEnd.setDate(weekStart.getDate() + 6);
					return transDate >= weekStart && transDate <= weekEnd;
				case 'month':
					return (
						transDate.getMonth() === date.getMonth() &&
						transDate.getFullYear() === date.getFullYear()
					);
				default:
					return true;
			}
		});
	};

	const processChartData = (transactions: any[]) => {
		return transactions.reduce((acc, transaction) => {
			const budget = budgets.find((b) => b.id === transaction.budget_id);
			const budgetId = budget?.id;
			const budgetName = budget?.title || 'Uncategorized';

			const existing = acc.find((item: any) =>
				budgetId ? item.budgetId === budgetId : item.name === budgetName
			);

			if (existing) {
				existing.value += transaction.amount;
			} else {
				acc.push({
					name: budgetName,
					value: transaction.amount,
					budgetId: budgetId,
				});
			}
			return acc;
		}, [] as { name: string; value: number; budgetId?: string }[]);
	};
	const calculateTotal = (transactions: any[]) => {
		return transactions.reduce(
			(sum, transaction) => sum + transaction.amount,
			0
		);
	};

	const dailyTransactions = filterTransactionsByPeriod('day');
	const weeklyTransactions = filterTransactionsByPeriod('week');
	const monthlyTransactions = filterTransactionsByPeriod('month');

	return (
		<div className="p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen dark:bg-gray-800">
			<Toaster position="top-center" />
			<h1 className="text-5xl font-extrabold text-gray-900 text-center mb-10 dark:text-white">
				Expenses Overview
			</h1>

			<div className="flex justify-end mb-8 dark:bg-gray-800 dark:text-white">
				<input
					type="date"
					value={selectedDate.toISOString().split('T')[0]}
					onChange={(e) => setSelectedDate(new Date(e.target.value))}
					className="border p-2 rounded dark:bg-gray-800 dark:text-white"
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
				<div className="bg-white p-6 rounded-xl shadow-md dark:bg-gray-700 dark:text-white">
					<h2 className="text-xl font-semibold mb-4 ">Daily Total</h2>
					<p className="text-3xl font-bold">
						${calculateTotal(dailyTransactions).toFixed(2)}
					</p>
				</div>
				<div className="bg-white p-6 rounded-xl shadow-md dark:bg-gray-700 dark:text-white">
					<h2 className="text-xl font-semibold mb-4 ">Weekly Total</h2>
					<p className="text-3xl font-bold">
						${calculateTotal(weeklyTransactions).toFixed(2)}
					</p>
				</div>
				<div className="bg-white p-6 rounded-xl shadow-md dark:bg-gray-700 dark:text-white">
					<h2 className="text-xl font-semibold mb-4">Monthly Total</h2>
					<p className="text-3xl font-bold">
						${calculateTotal(monthlyTransactions).toFixed(2)}
					</p>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
				<div className="bg-white p-6 rounded-xl shadow-md dark:bg-gray-700 dark:text-white">
					<h2 className="text-xl font-semibold mb-4">Daily Breakdown</h2>
					<ExpenseChart
						expenses={processChartData(dailyTransactions)}
						budgets={budgets}
					/>
				</div>
				<div className="bg-white p-6 rounded-xl shadow-md dark:bg-gray-700 dark:text-white">
					<h2 className="text-xl font-semibold mb-4">Weekly Breakdown</h2>
					<ExpenseChart
						expenses={processChartData(dailyTransactions)}
						budgets={budgets}
					/>
				</div>
				<div className="bg-white p-6 rounded-xl shadow-md dark:bg-gray-700 dark:text-white">
					<h2 className="text-xl font-semibold mb-4">Monthly Breakdown</h2>
					<ExpenseChart
						expenses={processChartData(dailyTransactions)}
						budgets={budgets}
					/>
				</div>
			</div>
		</div>
	);
}
