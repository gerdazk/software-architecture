import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET(req) {
	try {
		const params = req.nextUrl.searchParams;
		const email = params.get('email');

		const prisma = new PrismaClient();
		const sessions = await prisma.userSession.findMany({
			where: {
				user: {
					email: email,
				},
			},
			include: {
				session: true, // Include all fields from the Session model
				user: true,
			},
		});

		return NextResponse.json({ success: true, sessions, status: 200 });
	} catch (error) {
		console.error('Error fetching sessions2:', error);
		return NextResponse.json({
			success: false,
			error: 'Error fetching sessions2',
			status: 500,
		});
	}
}
