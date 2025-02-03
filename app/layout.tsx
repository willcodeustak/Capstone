import './globals.css';
import { Inter } from 'next/font/google';
import Navigation from './components/dashboard-content/report-content/Navigation';
import type React from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<div className="flex">
					<Navigation />
					<main className="flex-1 p-8">{children}</main>
				</div>
			</body>
		</html>
	);
}
