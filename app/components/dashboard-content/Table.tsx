import TransactionsItem from './TransactionsItem';
import type { TableProps } from '@/app/types/table';

const BUDGET_COLORS = [
	'bg-blue-500',
	'bg-green-500',
	'bg-yellow-500',
	'bg-red-500',
	'bg-purple-500',
	'bg-pink-500',
	'bg-indigo-500',
	'bg-teal-500',
];

export default function Table({ transactions, budgets, onUpdate }: TableProps) {
	return (
		<div className="overflow-x-auto">
			<table className="min-w-full bg-white">
				<thead>
					<tr>
						<th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-gray-700 uppercase tracking-wider">
							Name
						</th>
						<th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-gray-700 uppercase tracking-wider">
							Amount
						</th>
						<th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-gray-700 uppercase tracking-wider">
							Date
						</th>
						<th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-gray-700 uppercase tracking-wider">
							Budget
						</th>
						<th className="px-6 py-3 border-b-2 border-gray-300"></th>
					</tr>
				</thead>
				<tbody>
					{transactions.map((transaction) => {
						const budgetIndex = budgets.findIndex(
							(b) => b.id === transaction.budget_id
						);
						const budgetColor =
							BUDGET_COLORS[budgetIndex % BUDGET_COLORS.length];
						return (
							<TransactionsItem
								key={transaction.id}
								transactions={transaction}
								budgets={budgets}
								onUpdate={onUpdate}
								budgetColor={budgetColor}
							/>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
