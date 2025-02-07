// import type React from 'react';
// import type { Budget } from '../../types/budget';

// export default function BudgetList({ budgets }: { budgets: Budget[] }) {
// 	return (
// 		<div className="mt-6 w-full max-w-md">
// 			{budgets.length === 0 ? (
// 				<p className="text-cneter text-gray-500">No budgets added yet.</p>
// 			) : (
// 				budgets.map((budget) => (
// 					<div
// 						key={budget.id}
// 						className="p-4 bg-white rounded-lg shadow-md mb-2"
// 					>
// 						<h2 className="text-lg font-semibold">{budget.title}</h2>
// 						<p className="text-grey-600">${budget.amount}</p>
// 					</div>
// 				))
// 			)}
// 		</div>
// 	);
// }
