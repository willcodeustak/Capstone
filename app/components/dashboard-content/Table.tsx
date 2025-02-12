import TransactionsItem from './TransactionsItem';
import type { TableProps } from '@/app/types/table';
import { getBudgetColor } from '../../utils/colors';

export default function Table({ transactions, budgets, onUpdate }: TableProps) {
	return (
		<div className="overflow-x-auto">
			<table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden dark:bg-gray-700">
				<thead className="bg-gray-100 dark:bg-gray-600">
					<tr>
						<th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider text-gray-700 dark:text-white">
							Name
						</th>
						<th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider text-gray-700 dark:text-white">
							Amount
						</th>
						<th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider text-gray-700 dark:text-white">
							Date
						</th>
						<th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider text-gray-700 dark:text-white">
							Budget
						</th>
						<th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider text-gray-700 dark:text-white">
							Actions
						</th>
					</tr>
				</thead>

				{/* Table Body */}
				<tbody className="divide-y divide-gray-200 dark:divide-gray-600 dark:text-white">
					{transactions.map((transaction) => {
						const budget = budgets.find((b) => b.id === transaction.budget_id);
						const { bgColor } = budget
							? getBudgetColor(budget.id)
							: { bgColor: 'bg-gray-500' };

						return (
							<TransactionsItem
								key={transaction.id}
								transactions={transaction}
								budgets={budgets}
								onUpdate={onUpdate}
								budgetColor={bgColor}
							/>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
