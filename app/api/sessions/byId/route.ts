import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET(req) {
	try {
		const params = req.nextUrl.searchParams;
		const sessionId = params.get('sessionId');

		const prisma = new PrismaClient();
		const session = await prisma.session.findUnique({
			where: {
				id: sessionId,
			},
			include: {
				UserSession: {
					include: {
						user: true,
					},
				},
			},
		});

		return NextResponse.json({ success: true, session, status: 200 });
	} catch (error) {
		console.error('Error fetching sessions2:', error);
		return NextResponse.json({
			success: false,
			error: 'Error fetching sessions2',
			status: 500,
		});
	}
}
