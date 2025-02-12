const colorPalette = [
	{ borderColor: 'border-red-500', bgColor: 'bg-red-400' },
	{ borderColor: 'border-blue-500', bgColor: 'bg-blue-400' },
	{ borderColor: 'border-green-500', bgColor: 'bg-green-400' },
	{ borderColor: 'border-yellow-500', bgColor: 'bg-yellow-400' },
	{ borderColor: 'border-purple-500', bgColor: 'bg-purple-400' },
	{ borderColor: 'border-pink-500', bgColor: 'bg-pink-400' },
	{ borderColor: 'border-indigo-500', bgColor: 'bg-indigo-400' },
	{ borderColor: 'border-teal-500', bgColor: 'bg-teal-400' },
	{ borderColor: 'border-orange-500', bgColor: 'bg-orange-400' },
	{ borderColor: 'border-cyan-500', bgColor: 'bg-cyan-400' },
	{ borderColor: 'border-lime-500', bgColor: 'bg-lime-400' },
	{ borderColor: 'border-amber-500', bgColor: 'bg-amber-400' },
	{ borderColor: 'border-violet-500', bgColor: 'bg-violet-400' },
	{ borderColor: 'border-fuchsia-500', bgColor: 'bg-fuchsia-400' },
	{ borderColor: 'border-rose-500', bgColor: 'bg-rose-400' },
	{ borderColor: 'border-sky-500', bgColor: 'bg-sky-400' },
	{ borderColor: 'border-emerald-500', bgColor: 'bg-emerald-400' },
	{ borderColor: 'border-gray-500', bgColor: 'bg-gray-400' },
	{ borderColor: 'border-brown-500', bgColor: 'bg-brown-400' },
];

//19 colors

export function getBudgetColor(index: number) {
	return colorPalette[index % colorPalette.length];
}
