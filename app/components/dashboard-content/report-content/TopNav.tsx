'use client';

import DarkModeSwitcher from '../../DarkModeSwitcher/DarkModeSwitcher';
import DropdownMessage from '../../DarkModeSwitcher/DropdownMessage';

export default function Navigation() {
	return (
		<>
			{/* Top Navigation Bar */}
			<nav className="w-full bg-gray-800 text-white shadow-lg  sticky top-0 z-50">
				<div className="flex flex-grow items-center justify-between lg:justify-end px-4 py-2.5 shadow-2 md:px-6 2xl:px-11">
					<DarkModeSwitcher />
					<div> </div>
					<DropdownMessage />
				</div>
			</nav>
		</>
	);
}
