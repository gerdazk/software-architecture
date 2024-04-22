import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET(req) {
	try {
		const params = req.nextUrl.searchParams;
		const sessionId = params.get('sessionId');
		const userId = params.get('userId');

		const prisma = new PrismaClient();
		const userSession = await prisma.userSession.findUnique({
			where: {
				userId_sessionId: {
					userId: userId,
					sessionId: sessionId,
				},
			},
			select: {
				isConfirmed: true,
			},
		});

		return NextResponse.json({ success: true, userSession, status: 200 });
	} catch (error) {
		console.error('Error fetching sessions2:', error);
		return NextResponse.json({
			success: false,
			error: 'Error fetching sessions2',
			status: 500,
		});
	}
}
