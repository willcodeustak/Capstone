// app/signup/page.tsx
'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient'; // Path to your supabase client

const SignupPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleSignup = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const { data, error } = await supabase.auth.signUp({
				email,
				password,
			});

			if (error) {
				throw new Error(error.message);
			}

			// Access user from the data object
			console.log('Signed up successfully', data?.user);
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message);
			}
		}
	};

	return (
		<div>
			<h1>Sign Up</h1>
			{error && <p>{error}</p>}
			<form onSubmit={handleSignup}>
				<label>
					Email:
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label>
					Password:
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<button type="submit">Sign Up</button>
			</form>
		</div>
	);
};

export default SignupPage;
