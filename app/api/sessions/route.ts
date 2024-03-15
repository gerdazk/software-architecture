import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function POST(req) {
	const { title, sport, city, date, sessionStart, sessionFinish, capacity, description, type, approvable } =
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
			},
		});

		return NextResponse.json({ success: true, session, status: 201 });
	} catch (error) {
		console.error('Error updating user role:', error);
		return NextResponse.json({ success: false, error: 'Error creating session', status: 500 });
	}
}
