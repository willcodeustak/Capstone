import TransactionsItem from './TransactionsItem';
import type { TableProps } from '@/app/types/table';
import { getBudgetColor } from '../../utils/colors';

export default function Table({ transactions, budgets, onUpdate }: TableProps) {
	return (
		<div className="overflow-x-auto">
			<table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
				<thead className="bg-indigo-600 text-white">
					<tr>
						<th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
							Name
						</th>
						<th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
							Amount
						</th>
						<th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
							Date
						</th>
						<th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
							Budget
						</th>
						<th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
							Actions
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200">
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
