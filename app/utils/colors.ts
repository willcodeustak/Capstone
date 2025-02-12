export const getBudgetColor = (id: string) => {
	const colors = [
		{ border: 'border-blue-500', bg: 'bg-blue-500' },
		{ border: 'border-green-500', bg: 'bg-green-500' },
		{ border: 'border-yellow-500', bg: 'bg-yellow-500' },
		{ border: 'border-red-500', bg: 'bg-red-500' },
		{ border: 'border-purple-500', bg: 'bg-purple-500' },
		{ border: 'border-pink-500', bg: 'bg-pink-500' },
		{ border: 'border-indigo-500', bg: 'bg-indigo-500' },
	];

	const index = parseInt(id.replace(/\D/g, ''), 10) % colors.length;
	return {
		borderColor: colors[index].border,
		bgColor: colors[index].bg,
	};
};
