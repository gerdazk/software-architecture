import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest) {
	try {
		const { sessionId } = await req.json();
		const prisma = new PrismaClient();

		const currentSession = await prisma.session.findUnique({
			where: { id: sessionId },
			select: { joinable: true },
		});

		const updatedJoinable = !currentSession?.joinable;

		const updatedSession = await prisma.session.update({
			where: { id: sessionId },
			data: { joinable: updatedJoinable },
		});

		return NextResponse.json({
			success: true,
			user: updatedSession,
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
