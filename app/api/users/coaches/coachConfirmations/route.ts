import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function GET(req) {
  try {
    const prisma = new PrismaClient()
    const users = await prisma.user.findMany({
      where: {
        requestedToBeCoach: true,
        NOT: {
          role: 'coach'
        }
      }
    })

    return NextResponse.json({ success: true, users, status: 200 })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({
      success: false,
      error: 'Error fetching users',
      status: 500
    })
  }
}

export async function PATCH(req) {
  const { email } = await req.json()
  const prisma = new PrismaClient()

  try {
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { role: 'coach' }
    })

    return NextResponse.json({ success: true, user: updatedUser, status: 200 })
  } catch (error) {
    console.error('Error updating user role:', error)
    return NextResponse.json({
      success: false,
      error: 'Error updating user role',
      status: 500
    })
  }
}
