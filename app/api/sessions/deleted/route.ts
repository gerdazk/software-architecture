import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest) {
	try {
		const { sessionId } = await req.json();
		const prisma = new PrismaClient();

		const session = await prisma.session.update({
			where: { id: sessionId },
			data: { deleted: true },
		});

		return NextResponse.json({
			success: true,
			user: session,
			status: 200,
		});
	} catch (error) {
		console.error('Error updating session:', error);
		return NextResponse.json({
			success: false,
			error: 'Error updating session',
			status: 500,
		});
	}
}
