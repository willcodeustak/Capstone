'use client';

import DarkModeSwitcher from './DarkModeSwitcher';
import DropdownMessage from './DropdownMessage';
import { useAuth } from '../../utils/auth';
import { supabase } from '@/lib/supabase';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { LogOut } from 'lucide-react';

export default function Navigation() {
	const { user, signOutAndRedirect } = useAuth();
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [newPassword, setNewPassword] = useState('');
	const [isChangingPassword, setIsChangingPassword] = useState(false);

	if (!user) {
		return null;
	}

	const handlePasswordChange = async () => {
		if (!newPassword) {
			toast.error('Please enter a new password');
			return;
		}

		try {
			const { error } = await supabase.auth.updateUser({
				password: newPassword,
			});

			if (error) throw error;

			toast.success('Password changed successfully!');
			setIsChangingPassword(false);
			setNewPassword('');
		} catch (error) {
			toast.error('Error changing password');
			console.error(error);
		}
	};

	return (
		<>
			<nav className="w-full bg-gray-800 text-white shadow-lg sticky top-0 z-50">
				<div className="flex items-center justify-between px-4 py-2.5 md:px-6 2xl:px-11 gap-4">
					{/* top nav components					 */}
					<div className="flex items-center gap-4">
						<DropdownMessage />
					</div>

					<div className="flex items-center gap-4">
						<DarkModeSwitcher />
						<DropdownMessage />

						{/* user options dropdown */}
						<div className="relative">
							<button
								onClick={() => setIsDropdownOpen(!isDropdownOpen)}
								className="flex items-center gap-2 hover:bg-gray-700 px-3 py-3 rounded-lg transition-colors"
							>
								<span className="font-extrabold text-white">
									{user.user_metadata?.display_name ||
										user.email?.split('@')[0]}
								</span>
								<svg
									className="w-4 h-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</button>

							{isDropdownOpen && (
								<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 dark:bg-gray-700">
									{isChangingPassword ? (
										<div className="px-4 py-2">
											<input
												type="password"
												value={newPassword}
												onChange={(e) => setNewPassword(e.target.value)}
												placeholder="New Password"
												className="w-full px-2 py-1 border rounded dark:bg-gray-600 text-black dark:text-white"
											/>
											<div className="flex gap-2 mt-2">
												<button
													onClick={handlePasswordChange}
													className="text-sm bg-blue-500 text-white px-2 py-1 rounded"
												>
													Save
												</button>
												<button
													onClick={() => setIsChangingPassword(false)}
													className="text-sm bg-gray-500 text-white px-2 py-1 rounded"
												>
													Cancel
												</button>
											</div>
										</div>
									) : (
										<>
											<button
												onClick={() => setIsChangingPassword(true)}
												className="flex items-center text-gray-800 dark:text-gray-300 p-2 rounded-lg transition-all duration-200 ease-in-out w-full hover:bg-gray-700 hover:text-red-400 dark:hover:bg-gray-600 dark:hover:text-red-400"
											>
												<svg
													className="fill-current"
													width="22"
													height="22"
													viewBox="0 0 22 22"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
														fill=""
													/>
													<path
														d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
														fill=""
													/>
												</svg>
												<span className="text-1xl font-semibold">
													Change Password
												</span>
											</button>

											<button
												onClick={signOutAndRedirect}
												className="flex items-center text-gray-800 dark:text-gray-300 p-2 rounded-lg transition-all duration-200 ease-in-out w-full hover:bg-gray-700 hover:text-red-400 dark:hover:bg-gray-600 dark:hover:text-red-400"
											>
												<LogOut size={25} />
												<span className="text-1xl font-semibold">Logout</span>
											</button>
										</>
									)}
								</div>
							)}
						</div>
					</div>
				</div>
			</nav>
		</>
	);
}
