import Link from 'next/link';
import { Home, PieChart, LogOut } from 'lucide-react';

export default function Navigation() {
	return (
		<nav className="w-64 bg-gray-800 text-white h-screen shadow-lg">
			<div className="p-6 border-b border-gray-700">
				<Link href="/">
					<h1 className="text-4xl font-extrabold text-white tracking-wide">
						Budget Tracker
					</h1>
				</Link>
			</div>
			<ul className="space-y-4 p-6">
				{/* Dashboard Link */}
				<li>
					<Link
						href="/"
						className="flex items-center space-x-4 text-gray-300 hover:text-blue-400 p-2 rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-700"
					>
						<Home size={20} />
						<span className="text-xl font-semibold">Dashboard</span>
					</Link>
				</li>

				{/* Reports Link */}
				<li>
					<Link
						href="/dashboard/reports"
						className="flex items-center space-x-4 text-gray-300 hover:text-blue-400 p-2 rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-700"
					>
						<PieChart size={20} />
						<span className="text-xl font-semibold">Reports</span>
					</Link>
				</li>

				{/* Logout Button */}
				<li>
					<button className="flex items-center space-x-4 text-gray-300 hover:text-red-400 p-2 rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-700 w-full text-left">
						<LogOut size={20} />
						<span className="text-xl font-semibold">Logout</span>
					</button>
				</li>
			</ul>
		</nav>
	);
}
