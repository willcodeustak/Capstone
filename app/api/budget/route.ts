import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import prisma from '../../../lib/prisma';

export async function POST(request: Request) {
	const { name, amount } = await request.json();

	if (!name || !amount) {
		return NextResponse.json(
			{ error: 'Name and amount are required' },
			{ status: 400 }
		);
	}

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const newBudget = await prisma.budget.create({
			data: {
				name,
				amount,
				userId: user.id,
			},
		});

		return NextResponse.json(newBudget, { status: 201 });
	} catch (error) {
		console.error('Error creating budget:', error);
		return NextResponse.json(
			{ error: 'Failed to create budget' },
			{ status: 500 }
		);
	}
}
