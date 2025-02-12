'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from '../utils/auth';
import type { AuthError } from '@supabase/supabase-js';
import { Toaster, toast } from 'react-hot-toast';
import Image from 'next/image';
import { getUser } from '../utils/auth';

import signInPicture from '../images/signInPicture.jpg';

function LeftPanel() {
	return (
		<div className="flex flex-1 flex-col justify-center items-start bg-gradient-to-br to-indigo-600 text-black p-12">
			<div className="text-left">
				<h2 className="text-5xl font-extrabold mb-4">BudgetBreeze</h2>
				<p className="text-xl italic">
					Personal budgeting is a key step toward financial freedom. Start with
					BudgetBreeze today.
				</p>
			</div>
			<div className="mt-12">
				<Image
					src={signInPicture}
					alt="Business illustration"
					width={800}
					height={500}
					className="rounded-xl shadow-lg"
				/>
			</div>
		</div>
	);
}

export default function SigninPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		try {
			const { error } = await signIn(email, password);
			if (error) throw error;

			const user = await getUser();

			const displayName = user?.user_metadata?.display_name || 'User';

			toast.success(`Welcome back, ${displayName} 🎉`, {
				className: 'text-xl p-4 min-w-[300px]',
			});

			setTimeout(() => router.push('/dashboard'), 1500);
		} catch (err) {
			const authError = err as AuthError;
			toast.error(authError.message, {
				className: 'text-xl p-4 min-w-[300px]',
			});
		}
	};

	return (
		<div className="min-h-screen flex">
			<Toaster />
			<LeftPanel />

			<div className="w-1/2 flex items-center justify-center bg-white-50 p-12 relative">
				<div className="absolute left-0 h-1/2 w-px bg-gray-300"></div>
				<div className="max-w-md w-full space-y-8">
					<h2 className="text-3xl font-extrabold text-gray-900 text-center">
						Sign in to your account
					</h2>

					<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
						<div className="rounded-md shadow-sm -space-y-px">
							<div>
								<label htmlFor="email-address" className="sr-only">
									Email address
								</label>
								<input
									id="email-address"
									name="email"
									type="email"
									autoComplete="email"
									required
									className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
									placeholder="Email address"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div>
								<label htmlFor="password" className="sr-only">
									Password
								</label>
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
									placeholder="Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
						</div>

						{error && <div className="text-red-500 text-sm">{error}</div>}

						<button
							type="submit"
							className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Sign in
						</button>
					</form>

					<div className="text-sm text-center">
						<Link
							href="/signup"
							className="font-medium text-indigo-600 hover:text-indigo-500"
						>
							Don't have an account? Sign up
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
