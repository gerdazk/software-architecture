import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET(req) {
	try {
		const { email } = await req.json();
		const prisma = new PrismaClient();
		const user = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});

		return NextResponse.json({ success: true, user, status: 200 });
	} catch (error) {
		console.error('Error fetching users:', error);
		return NextResponse.json({ success: false, error: 'Error fetching users', status: 500 });
	}
}

export async function PATCH(req) {
	try {
		const { name, email, city, description } = await req.json();
		const prisma = new PrismaClient();

		// Update user data in the database
		const updatedUser = await prisma.user.update({
			where: {
				email: email,
			},
			data: {
				name: name,
				city: city,
				description: description,
			},
		});

		return NextResponse.json({ success: true, user: updatedUser, status: 200 });
	} catch (error) {
		console.error('Error updating user:', error);
		return NextResponse.json({ success: false, error: 'Error updating user', status: 500 });
	}
}
