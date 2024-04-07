import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const prisma = new PrismaClient()
    const users = await prisma.user.findMany({
      where: {
        role: 'coach'
      },
      select: {
        name: true,
        city: true,
        sports: true
      }
    })

    return NextResponse.json({ success: true, users, status: 200 })
  } catch (error) {
    console.error('Error fetching coaches:', error)
    return NextResponse.json({
      success: false,
      error: 'Error fetching coaches',
      status: 500
    })
  }
}
