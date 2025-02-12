import './globals.css';
import { Inter } from 'next/font/google';
import Navigation from './components/dashboard-content/report-content/Navigation';
import type React from 'react';
import TopNav from '../app/components/dashboard-content/report-content/TopNav';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<TopNav />
				<div className="flex">
					<Navigation />
					<main className="flex-1 p-8 bg-gray-50 dark:bg-gray-800 pl-72">
						{children}
					</main>
				</div>
			</body>
		</html>
	);
}
