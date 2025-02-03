import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';

export async function signUp(email: string, password: string) {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
	});
	return { data, error };
}

export async function signIn(email: string, password: string) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});
	return { data, error };
}

export async function signOut() {
	const { error } = await supabase.auth.signOut();
	return { error };
}

export async function getUser() {
	const {
		data: { user },
	} = await supabase.auth.getUser();
	return user;
}

// Custom hook for authentication
export function useAuth() {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const {
			data: { subscription },
			//function listens for changes in the user's authentication state
		} = supabase.auth.onAuthStateChange((event, session) => {
			setUser(session?.user ?? null);
			setLoading(false);
		});

		// like a break call but for listening for auth state
		return () => subscription.unsubscribe();
	}, []);
	const signOutAndRedirect = async () => {
		await signOut();
		router.push('/signin');
	};

	return { user, loading, signUp, signIn, signOutAndRedirect, getUser };
}
