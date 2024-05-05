import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const body = await req.json();
	const { coachEmail, userId, sessionId, rating: newRating } = body;

	const prisma = new PrismaClient();

	try {
		const user = await prisma.user.findUnique({
			where: {
				email: coachEmail,
			},
		});

		const { rating, numberOfRatings } = user;

		const updatedRatingCount = numberOfRatings + 1;
		const updatedRating = (rating * numberOfRatings + Number(newRating)) / updatedRatingCount;

		await prisma.user.update({
			where: {
				email: coachEmail,
			},
			data: {
				rating: updatedRating,
				numberOfRatings: updatedRatingCount,
			},
		});

		await prisma.userSession.updateMany({
			where: {
				userId,
				sessionId,
			},
			data: {
				isCoachRated: true,
			},
		});

		return NextResponse.json({ success: true, updatedRating, status: 201 });
	} catch (error) {
		console.error('Error updating rating:', error);
		return NextResponse.json({
			success: false,
			error: 'Error updating rating',
			status: 500,
		});
	}
}
