'use client';

import Link from 'next/link';
import { Home, PieChart, LogOut } from 'lucide-react';
import { useAuth } from '../../../utils/auth';

export default function Navigation() {
	const { user, signOutAndRedirect } = useAuth();
	if (!user) {
		return null; // simply hides from user if !user
	}
	return (
		<nav className="w-65 bg-gray-800 text-white h-screen shadow-lg fixed top-0 left-0 z-50">
			<div className="p-4 border-b border-gray-700">
				<Link href="/dashboard">
					<h1 className="text-3xl font-extrabold text-white ">Budget Breeze</h1>
				</Link>
			</div>
			<ul className="space-y-6 p-4">
				{/* Dashboard Link */}
				<li>
					<Link
						href="/dashboard"
						className="flex items-center space-x-5 text-gray-300 hover:text-blue-400 p-3 rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-700"
					>
						<Home size={25} />
						<span className="text-1xl font-semibold">Dashboard</span>
					</Link>
				</li>

				{/* Reports Link */}
				<li>
					<Link
						href="/dashboard/reports"
						className="flex items-center space-x-5 text-gray-300 hover:text-blue-400 p-3 rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-700"
					>
						<PieChart size={25} />
						<span className="text-1xl font-semibold">Reports</span>
					</Link>
				</li>
			</ul>
		</nav>
	);
}
