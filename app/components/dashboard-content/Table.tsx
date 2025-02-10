import TransactionsItem from './TransactionsItem';
import type { TableProps } from '@/app/types/table';
import { getBudgetColor } from '../../utils/colors';

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
