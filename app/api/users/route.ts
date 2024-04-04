import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function GET(req) {
  try {
    const urlParams = new URLSearchParams(req.url.split('?')[1])
    const email = urlParams.get('email')

    const prisma = new PrismaClient()
    const user = await prisma.user.findUnique({
      where: {
        email: email.toString() // Ensure email is converted to string
      },
      select: {
        name: true,
        email: true,
        city: true,
        description: true,
        role: true
      }
    })
    console.log('All good2')
    return NextResponse.json({ success: true, user, status: 200 })
  } catch (error) {
    console.error('Error fetching users2:', error)
    return NextResponse.json({
      success: false,
      error: 'Error fetching users2',
      status: 500
    })
  }
}

export async function PATCH(req) {
	const { email, name, city, description } = await req.json();

	const prisma = new PrismaClient();
	try {
		const updatedUser = await prisma.user.update({
			where: { email },
			data: { name: name, city: city, description: description },
		});

		return NextResponse.json({ success: true, user: updatedUser, status: 200 });
	} catch (error) {
		console.error('Error updating users:', error);
		return NextResponse.json({ success: false, error: 'Error updating users', status: 500 });
	}
}
