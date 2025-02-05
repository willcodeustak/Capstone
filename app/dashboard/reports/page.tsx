'use client';

import { useState, useEffect } from 'react';
import ExpenseForm from '../../components/dashboard-content/report-content/ExpenseForm';
import ExpenseChart from '../../components/dashboard-content/report-content/ExpenseChart';

import ExpenseList from '../../components/dashboard-content/report-content/ExpenseList';
import { useExpenses } from '../../hooks/useExpenses';
import { useRouter } from 'next/navigation';
import { getUser } from '../../utils/auth';

//reports main
export default function Reports() {
	const [showForm, setShowForm] = useState<boolean>(false);
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());
	const [userId, setUserId] = useState<string | null>(null);
	const router = useRouter();
	useEffect(() => {
		const checkUser = async () => {
			const user = await getUser();
			if (!user) {
				router.push('/signin');
			} else {
				setUserId(user.id);
			}
		};
		checkUser();
	}, [router]);

	const {
		expenses,
		addExpense,
		getDailyTotal,
		getWeeklyTotal,
		getMonthlyTotal,
		getExpensesForPeriod,
	} = useExpenses();

	const dailyExpenses = getExpensesForPeriod(selectedDate, 'daily');
	const weeklyExpenses = getExpensesForPeriod(selectedDate, 'weekly');
	const monthlyExpenses = getExpensesForPeriod(selectedDate, 'monthly');

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h2 className="text-3xl font-bold">Reports</h2>
				<button
					onClick={() => setShowForm(!showForm)}
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				>
					{showForm ? 'Close Form' : 'Add Expense'}
				</button>
			</div>

			{showForm && <ExpenseForm onAddExpense={addExpense} />}

			<div className="flex justify-end">
				<input
					type="todays-date"
					value={selectedDate.toISOString().split('T')[0]}
					onChange={(e) => setSelectedDate(new Date(e.target.value))}
					className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="bg-white shadow-md rounded-lg p-6">
					<h3 className="text-xl font-semibold mb-4">Daily Total</h3>
					<p className="text-4xl font-bold">
						${getDailyTotal(selectedDate).toFixed(2)}
					</p>
				</div>
				<div className="bg-white shadow-md rounded-lg p-6">
					<h3 className="text-xl font-semibold mb-4">Weekly Total</h3>
					<p className="text-4xl font-bold">
						${getWeeklyTotal(selectedDate).toFixed(2)}
					</p>
				</div>
				<div className="bg-white shadow-md rounded-lg p-6">
					<h3 className="text-xl font-semibold mb-4">Monthly Total</h3>
					<p className="text-4xl font-bold">
						${getMonthlyTotal(selectedDate).toFixed(2)}
					</p>
				</div>
			</div>

			<div className="bg-white shadow-md rounded-lg p-6">
				<h3 className="text-xl font-semibold mb-4">Daily Spending Breakdown</h3>
				<ExpenseChart expenses={dailyExpenses} />
			</div>

			<div className="bg-white shadow-md rounded-lg p-6">
				<h3 className="text-xl font-semibold mb-4">
					Weekly Spending Breakdown
				</h3>
				<ExpenseChart expenses={weeklyExpenses} />
			</div>

			<div className="bg-white shadow-md rounded-lg p-6">
				<h3 className="text-xl font-semibold mb-4">
					Monthly Spending Breakdown
				</h3>
				<ExpenseChart expenses={monthlyExpenses} />
			</div>

			<ExpenseList expenses={monthlyExpenses} />
		</div>
	);
}
