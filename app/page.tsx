'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUser } from './utils/auth';

export default function Home() {
	const router = useRouter();

	useEffect(() => {
		const checkUser = async () => {
			const user = await getUser();
			if (user) {
				router.push('/dashboard');
			} else {
				router.push('/signin');
			}
		};
		checkUser();
	}, [router]);

	return (
		<div className="flex items-center justify-center min-h-screen">
			<p>Loading...</p>
		</div>
	);
}
