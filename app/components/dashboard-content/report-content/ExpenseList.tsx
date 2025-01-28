import type { Expense } from '../../../types/expense';

interface ExpenseListProps {
	expenses: Expense[];
}

// ExpenseList component
export default function ExpenseList({ expenses }: ExpenseListProps) {
	// If there are no expenses, display a message
	if (expenses.length === 0) {
		return (
			<p className="text-center text-gray-500">
				No expenses found for the selected month.
			</p>
		);
	}

	return (
		<div className="overflow-x-auto">
			<table className="min-w-full bg-white">
				<thead className="bg-gray-100">
					<tr>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Date
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Category
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Description
						</th>
						<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
							Amount
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200">
					{expenses.map((expense) => (
						<tr key={expense.id}>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
								{new Date(expense.date).toLocaleString()}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
								{expense.category}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
								{expense.description || '-'}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
								${expense.amount.toFixed(2)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
