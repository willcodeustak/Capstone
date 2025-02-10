// utils/colors.ts
export const BUDGET_BORDER_COLORS = [
	'border-blue-500',
	'border-green-500',
	'border-yellow-500',
	'border-red-500',
	'border-purple-500',
	'border-pink-500',
	'border-indigo-500',
	'border-teal-500',
];

export const BUDGET_BG_COLORS = [
	'bg-blue-500',
	'bg-green-500',
	'bg-yellow-500',
	'bg-red-500',
	'bg-purple-500',
	'bg-pink-500',
	'bg-indigo-500',
	'bg-teal-500',
];

export const getBudgetColor = (budgetId: string) => {
	const colorIndex = budgetId.charCodeAt(1) % BUDGET_BG_COLORS.length;
	return {
		borderColor: BUDGET_BORDER_COLORS[colorIndex],
		bgColor: BUDGET_BG_COLORS[colorIndex],
	};
};
