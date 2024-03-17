import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function POST(req: {
	json: () => PromiseLike<{
		title: string;
		sport: string;
		city: string;
		date: string; // Specify type as Date
		sessionStart: string;
		sessionFinish: string;
		capacity: number;
		description: string;
		type: boolean;
		approvable: boolean;
		coachEmail: string;
	}>;
}) {
	const { title, sport, city, date, sessionStart, sessionFinish, capacity, description, type, approvable, coachEmail } =
		await req.json();
	const prisma = new PrismaClient();

	try {
		const session = await prisma.session.create({
			data: {
				title,
				sport,
				city,
				date,
				sessionStart,
				sessionFinish,
				capacity,
				description,
				type,
				approvable,
				coachEmail
			},
		});

		return NextResponse.json({ success: true, session, status: 201 });
	} catch (error) {
		console.error('Error creating session:', error);
		return NextResponse.json({ success: false, error: 'Error creating session', status: 500 });
	}
}
