import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const prisma = new PrismaClient()

  try {
    const userSession = await prisma.userSession.create({
      data: {
        ...body
      }
    })

    return NextResponse.json({ success: true, userSession, status: 201 })
  } catch (error) {
    console.error('Error creating user session:', error)
    return NextResponse.json({
      success: false,
      error: 'Error creating user session',
      status: 500
    })
  }
}
