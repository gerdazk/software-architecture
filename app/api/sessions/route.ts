import { isRequestBodyValid } from '@/src/utils/isRequestBodyValid';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { sessionSchema } from './schemas';

export async function POST(req: NextRequest) {
	const body = await req.json();
	const prisma = new PrismaClient();

	const isBodyValid = body && isRequestBodyValid({ schema: sessionSchema, body });

	if (!isBodyValid) {
		return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
	}

	try {
		const session = await prisma.session.create({
			data: body,
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

export async function GET(req: NextRequest) {
	const params = req.nextUrl.searchParams;
	const id = params.get('id');
	const prisma = new PrismaClient();

	try {
		const sessions = id
			? await prisma.session.findUnique({
					where: {
						id,
					},
					include: {
						UserSession: true,
					},
				})
			: await prisma.session.findMany();

		return NextResponse.json(sessions, { status: 200 });
	} catch (error) {
		console.error('Error finding sessions:', error);
		return NextResponse.json({ success: false, error: 'Error finding sessions' }, { status: 500 });
	}
}

export async function PATCH(req: NextRequest) {
	const body = await req.json();
	const prisma = new PrismaClient();
	try {
		const updatedSession =
			body &&
			(await prisma.session.update({
				where: { id: body.id },
				data: {
					...body,
				},
			}));

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

export async function DELETE(req: NextRequest) {
	const { sessionId } = await req.json();
	const prisma = new PrismaClient();
	try {
		await prisma.userSession.deleteMany({
			where: { sessionId: sessionId },
		});
		await prisma.session.delete({
			where: { id: sessionId },
		});

		return NextResponse.json({
			success: true,
			status: 200,
		});
	} catch (error) {
		console.error('Error deleting session:', error);
		return NextResponse.json({
			success: false,
			error: 'Error deleting session',
			status: 500,
		});
	}
}
