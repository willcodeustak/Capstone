import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';
import { Toaster, toast } from 'react-hot-toast';

export async function signUp(
	email: string,
	password: string,
	displayName: string
) {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				display_name: displayName, // Store the display name in user_metadata
			},
		},
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
		const { error } = await supabase.auth.signOut();
		if (!error) {
			// Reset dark mode to light mode
			localStorage.setItem('color-mode', 'light');
			window.dispatchEvent(new Event('storage')); // Trigger storage event
			router.push('/signin');
		} else {
			console.error('Error signing out:', error);
		}
	};

	return { user, loading, signUp, signIn, signOutAndRedirect, getUser };
}
