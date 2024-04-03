import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET(req) {
	try {
		const { email } = await req.json();
		const prisma = new PrismaClient();
		const user = await prisma.user.findFirst({
			where: {
				email: email,
			},
		});
		console.log('All good2');
		return NextResponse.json({ success: true, user, status: 200 });
	} catch (error) {
		console.error('Error fetching users2:', error);
		return NextResponse.json({ success: false, error: 'Error fetching users2', status: 500 });
	}
}
