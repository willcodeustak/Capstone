// hooks/useConfirmDelete.ts
import { toast } from 'react-hot-toast';

export const useConfirmDelete = () => {
	const confirmDelete = (message: string, onConfirm: () => void) => {
		if (window.confirm(message)) {
			try {
				onConfirm();
				toast.success('Deleted successfully');
			} catch (error) {
				toast.error('Error deleting');
			}
		}
	};

	return { confirmDelete };
};
