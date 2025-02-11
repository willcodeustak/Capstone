'use client';

import {
	PieChart,
	Pie,
	Cell,
	ResponsiveContainer,
	Legend,
	Tooltip,
} from 'recharts';
import type { Expense } from '../../../types/expense';

interface ExpenseChartProps {
	expenses: Expense[];
}

const COLORS = [
	'#0088FE',
	'#00C49F',
	'#FFBB28',
	'#FF8042',
	'#8884D8',
	'#82CA9D',
	'#FFA07A',
	'#20B2AA',
	'#B0C4DE',
	'#DDA0DD',
];

export default function ExpenseChart({ expenses }: ExpenseChartProps) {
	// Aggregate expenses by category
	const data = expenses.reduce((acc, expense) => {
		const existingCategory = acc.find((item) => item.name === expense.name); // changed to match property
		if (existingCategory) {
			existingCategory.value += expense.value; // changed to match property
		} else {
			acc.push({ name: expense.name, value: expense.value }); // changed to match property
		}
		return acc;
	}, [] as { name: string; value: number }[]);

	if (data.length === 0) {
		return (
			<p className="text-center text-gray-500">
				No data available for the selected period.
			</p>
		);
	}

	return (
		<ResponsiveContainer width="100%" height={300}>
			<PieChart>
				<Pie
					data={data}
					cx="50%"
					cy="50%"
					labelLine={false}
					outerRadius={80}
					fill="#8884d8"
					dataKey="value"
				>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
				<Tooltip />
				<Legend />
			</PieChart>
		</ResponsiveContainer>
	);
}
