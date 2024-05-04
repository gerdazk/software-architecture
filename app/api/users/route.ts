import { isRequestBodyValid } from '@/src/utils/isRequestBodyValid';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { userUpdateSchema } from './schemas';

export async function GET(req: NextRequest) {
	try {
		const urlParams = new URLSearchParams(req.url.split('?')[1]);
		const email = urlParams.get('email');

		const prisma = new PrismaClient();
		const user =
			email &&
			(await prisma.user.findUnique({
				where: {
					email: email,
				},
				select: {
					id: true,
					name: true,
					email: true,
					city: true,
					description: true,
					sports: true,
					role: true,
					rating: true,
				},
			}));
		return NextResponse.json({ success: true, user, status: 200 });
	} catch (error) {
		console.error('Error fetching users2:', error);
		return NextResponse.json({
			success: false,
			error: 'Error fetching users2',
			status: 500,
		});
	}
}

export async function PATCH(req: NextRequest) {
	const { email, name, city, sports, description } = await req.json();

	const isBodyValid = isRequestBodyValid({
		schema: userUpdateSchema,
		body: {
			email,
			name,
			city,
			sports,
			description,
		},
	});

	if (!isBodyValid) {
		return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
	}

	const prisma = new PrismaClient();
	try {
		const updatedUser = await prisma.user.update({
			where: { email },
			data: { name: name, city: city, description: description, sports: sports },
		});

		return NextResponse.json({ success: true, user: updatedUser, status: 200 });
	} catch (error) {
		console.error('Error updating users:', error);
		return NextResponse.json({
			success: false,
			error: 'Error updating users',
			status: 500,
		});
	}
}
