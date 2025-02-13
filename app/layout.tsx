'use client';
import './globals.css';
import { Inter } from 'next/font/google';
import Navigation from './components/dashboard-content/report-content/Navigation';
import type React from 'react';
import TopNav from './components/navbar-content/TopNav';
import { useAuth } from './utils/auth';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const { user } = useAuth();
	const isDashboard = pathname?.startsWith('/dashboard');

	return (
		<html lang="en">
			<body className={inter.className}>
				<TopNav />
				<div className="flex">
					{isDashboard && <Navigation />}
					<main
						className={`flex-1 p-8 bg-gray-50 dark:bg-gray-800 ${
							isDashboard ? 'pl-72' : 'pl-32'
						}`}
					>
						{children}
					</main>
				</div>
			</body>
		</html>
	);
}
