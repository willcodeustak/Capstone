// api/expense.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/db';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		const { name, amount, budgetId, userId } = req.body;

		try {
			const expense = await prisma.expense.create({
				data: {
					name,
					amount,
					budgetId,
					userId,
				},
			});

			res.status(201).json(expense);
		} catch (error) {
			res.status(500).json({ error: 'Failed to create expense' });
		}
	} else {
		res.status(405).json({ error: 'Method not allowed' });
	}
}
