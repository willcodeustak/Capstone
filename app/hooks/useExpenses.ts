import { useState, useEffect } from 'react';
import type { Expense } from '../types/expense';

export function useExpenses() {
	const [expenses, setExpenses] = useState<Expense[]>([]);

	useEffect(() => {
		const storedExpenses = localStorage.getItem('expenses');
		if (storedExpenses) {
			setExpenses(JSON.parse(storedExpenses));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('expenses', JSON.stringify(expenses));
	}, [expenses]);

	const addExpense = (expense: Expense) => {
		setExpenses((prevExpenses) => [...prevExpenses, expense]);
	};

	const totalSpending = (expenseList: Expense[]): number => {
		return expenseList.reduce((total, expense) => total + expense.amount, 0);
	};

	const getExpensesForPeriod = (
		date: Date,
		period: 'daily' | 'weekly' | 'monthly'
	): Expense[] => {
		const startDate = new Date(date);
		startDate.setHours(0, 0, 0, 0);

		const endDate = new Date(startDate);
		switch (period) {
			case 'daily':
				endDate.setDate(startDate.getDate() + 1);
				break;
			case 'weekly':
				endDate.setDate(startDate.getDate() + 7);
				break;
			case 'monthly':
				endDate.setMonth(startDate.getMonth() + 1);
				break;
		}

		return expenses.filter((expense) => {
			const expenseDate = new Date(expense.date);
			return expenseDate >= startDate && expenseDate < endDate;
		});
	};

	const getDailyTotal = (date: Date): number => {
		return totalSpending(getExpensesForPeriod(date, 'daily'));
	};

	const getWeeklyTotal = (date: Date): number => {
		return totalSpending(getExpensesForPeriod(date, 'weekly'));
	};

	const getMonthlyTotal = (date: Date): number => {
		return totalSpending(getExpensesForPeriod(date, 'monthly'));
	};

	return {
		expenses,
		addExpense,
		getDailyTotal,
		getWeeklyTotal,
		getMonthlyTotal,
		getExpensesForPeriod,
	};
}
