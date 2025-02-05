'use client';

import Link from 'next/link';
import { Home, PieChart, LogOut } from 'lucide-react';
import { useAuth } from '../../../utils/auth';

export default function Navigation() {
	const { user, signOutAndRedirect } = useAuth();
	if (!user) {
		return null; // Or you can return a loading state, or nothing
	}
	return (
		<nav className="w-72 bg-gray-800 text-white h-screen shadow-lg">
			<div className="p-8 border-b border-gray-700">
				<Link href="/dashboard">
					<h1 className="text-5xl font-extrabold text-white tracking-wide">
						Budget Tracker
					</h1>
				</Link>
			</div>
			<ul className="space-y-6 p-8">
				{/* Dashboard Link */}
				<li>
					<Link
						href="/dashboard"
						className="flex items-center space-x-5 text-gray-300 hover:text-blue-400 p-3 rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-700"
					>
						<Home size={24} />
						<span className="text-2xl font-semibold">Dashboard</span>
					</Link>
				</li>

				{/* Reports Link */}
				<li>
					<Link
						href="/dashboard/reports"
						className="flex items-center space-x-5 text-gray-300 hover:text-blue-400 p-3 rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-700"
					>
						<PieChart size={24} />
						<span className="text-2xl font-semibold">Reports</span>
					</Link>
				</li>

				{/* Logout Button */}
				<li>
					<button
						onClick={signOutAndRedirect}
						className="flex items-center space-x-5 text-gray-300 hover:text-red-400 p-3 rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-700 w-full text-left"
					>
						<LogOut size={24} />
						<span className="text-2xl font-semibold">Logout</span>
					</button>
				</li>
			</ul>
		</nav>
	);
}
