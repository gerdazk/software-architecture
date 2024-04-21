import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET(req) {
	try {
		const params = req.nextUrl.searchParams;
		const email = params.get('email');

		const prisma = new PrismaClient();
		const userSessions = await prisma.userSession.findMany({
			where: {
				session: {
					coachEmail: email,
				},
				isConfirmed: false,
			},
			include: {
				user: {
					select: {
						name: true,
					},
				},
				session: {
					select: {
						title: true,
						date: true,
					},
				},
			},
		});

		return NextResponse.json({ success: true, userSessions, status: 200 });
	} catch (error) {
		console.error('Error fetching sessions2:', error);
		return NextResponse.json({
			success: false,
			error: 'Error fetching sessions2',
			status: 500,
		});
	}
}

export async function PATCH(req) {
	const { sessionId, userId } = await req.json();
	const prisma = new PrismaClient();

	try {
		const updatedUserSession = await prisma.userSession.update({
			where: {
				userId_sessionId: {
					userId: userId,
					sessionId: sessionId,
				},
			},
			data: { isConfirmed: true },
		});

		return NextResponse.json({ success: true, user: updatedUserSession, status: 200 });
	} catch (error) {
		console.error('Error updating user role:', error);
		return NextResponse.json({
			success: false,
			error: 'Error updating user role',
			status: 500,
		});
	}
}
