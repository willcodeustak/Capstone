'use client';
import './globals.css';
import { Inter } from 'next/font/google';
import Navigation from './components/dashboard-content/report-content/Navigation';
import type React from 'react';
import TopNav from './components/navbar-content/TopNav';
import { useEffect } from 'react';
import { useAuth } from './utils/auth';
import useColorMode from './hooks/useColorMode';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { user } = useAuth();
	const [colorMode, setColorMode] = useColorMode();

	useEffect(() => {
		if (!user) {
			setColorMode('light'); // Force light mode if user is not logged in
		}
	}, [user, setColorMode]);

	return (
		<html lang="en">
			<body className={inter.className}>
				<TopNav />
				<div className="flex">
					<Navigation />

					<main className="colorMode === 'dark' ? 'dark' : '' flex-1 p-8 bg-gray-50 dark:bg-gray-800 pl-72">
						{children}
					</main>
				</div>
			</body>
		</html>
	);
}
