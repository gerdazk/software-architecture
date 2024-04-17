import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function POST(req: {
	json: () => PromiseLike<{
		title: string;
		sport: string;
		city: string;
		date: string;
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
				coachEmail,
			},
		});

		return NextResponse.json({ success: true, session, status: 201 });
	} catch (error) {
		console.error('Error creating session:', error);
		return NextResponse.json({
			success: false,
			error: 'Error creating session',
			status: 500,
		});
	}
}

export async function GET() {
	try {
		const prisma = new PrismaClient();
		const sessions = await prisma.session.findMany();

		return NextResponse.json({ success: true, sessions, status: 200 });
	} catch (error) {
		console.error('Error fetching sessions:', error);
		return NextResponse.json({
			success: false,
			error: 'Error fetching sessions',
			status: 500,
		});
	}
}

export async function PATCH(req: {
	json: () => PromiseLike<{
		title: string;
		sport: string;
		city: string;
		date: string;
		sessionStart: string;
		sessionFinish: string;
		capacity: number;
		description: string;
		type: boolean;
		approvable: boolean;
		coachEmail: string;
		id: string;
	}>;
}) {
	const {
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
		coachEmail,
		id,
	} = await req.json();
	const prisma = new PrismaClient();
	try {
		const updatedSession = await prisma.session.update({
			where: { id: id },
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
				coachEmail,
			},
		});

		return NextResponse.json({ success: true, user: updatedSession, status: 200 });
	} catch (error) {
		console.error('Error updating users:', error);
		return NextResponse.json({
			success: false,
			error: 'Error updating users',
			status: 500,
		});
	}
}
