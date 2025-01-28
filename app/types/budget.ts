// types/budget.ts
export interface Budget {
	id: string;
	user_id: string; // or whatever the user ID field is
	name: string;
	amount: number;
	category_name: string;
	created_at: string;
	updated_at: string;
}
