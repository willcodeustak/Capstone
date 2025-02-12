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

const COLORS = [
	'#0088FE', // Blue
	'#00C49F', // Teal
	'#FFBB28', // Yellow
	'#FF8042', // Orange
	'#8884D8', // Purple
	'#82CA9D', // Green
	'#FFA07A', // Salmon
	'#20B2AA', // Light Sea Green
	'#B0C4DE', // Light Steel Blue
	'#DDA0DD', // Plum
];

const getColorIndex = (title: string) => {
	let hash = 0;
	for (let i = 0; i < title.length; i++) {
		hash = (hash << 5) - hash + title.charCodeAt(i);
		hash |= 0;
	}
	return Math.abs(hash) % COLORS.length;
};

export default function ExpenseChart({ expenses }: ExpenseChartProps) {
	const data = expenses.reduce((acc, expense) => {
		const existingCategory = acc.find((item) => item.name === expense.name);
		if (existingCategory) {
			existingCategory.value += expense.value;
		} else {
			acc.push({ name: expense.name, value: expense.value });
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
						<Cell
							key={`cell-${index}`}
							fill={COLORS[getColorIndex(entry.name)]}
						/>
					))}
				</Pie>
				<Tooltip />
				<Legend />
			</PieChart>
		</ResponsiveContainer>
	);
}
