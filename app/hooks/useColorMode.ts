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
			setColorMode('light');
		}
	}, []);

	useEffect(() => {
		const className = 'dark';
		const htmlElement = window.document.documentElement; // changed body selection to html

		colorMode === 'dark'
			? htmlElement.classList.add(className)
			: htmlElement.classList.remove(className);
	}, [colorMode]);

	return [colorMode, setColorMode] as const;
}
