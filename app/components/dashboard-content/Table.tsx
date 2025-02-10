import TransactionsItem from './TransactionsItem';

interface TableProps {
	transactions: {
		id: string;
		title: string;
		amount: number;
		date: string;
		budget_id: string;
	}[];
	budgets: {
		id: string;
		title: string;
	}[];
	onUpdate: () => void;
}

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
					{transactions.map((transactions) => (
						<TransactionsItem
							key={transactions.id}
							transactions={transactions}
							budgets={budgets} // uhhh
							onUpdate={onUpdate}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
}
