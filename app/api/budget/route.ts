import { NextResponse } from 'next/server';
import prisma from '../../../lib/db';

export async function POST(request: Request) {
	try {
		const body = await request.json();
		console.log('Request Body:', body); // Debugging line

		const { name, amount } = body;

		if (!name || !amount) {
			return NextResponse.json(
				{ error: 'Missing required fields: name or amount' },
				{ status: 400 }
			);
		}

		const budget = await prisma.budget.create({
			data: {
				name,
				amount,
				userId: 1, //  dummy userId ( user authentication later)
			},
		});

		return NextResponse.json(budget);
	} catch (error) {
		console.error('Error creating budget:', error);
		return NextResponse.json(
			{ error: 'Failed to create budget' },
			{ status: 500 }
		);
	}
}
