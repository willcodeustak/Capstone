import { useEffect, useState } from 'react';

export default function useColorMode() {
	const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');

	useEffect(() => {
		const storedColorMode = localStorage.getItem('color-mode') as
			| 'light'
			| 'dark'
			| null;
		if (storedColorMode) {
			setColorMode(storedColorMode);
		} else {
			setColorMode('light'); // Default to light mode
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('color-mode', colorMode);
		document.documentElement.classList.toggle('dark', colorMode === 'dark');
	}, [colorMode]);

	return [colorMode, setColorMode] as const;
}
