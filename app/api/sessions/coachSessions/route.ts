import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function GET(req) {
  try {
    const urlParams = new URLSearchParams(req.url.split('?')[1])
    const email = urlParams.get('email')

    const prisma = new PrismaClient()
    const sessions = await prisma.session.findMany({
      where: {
        coachEmail: email?.toString()
      }
    })

    return NextResponse.json({ success: true, sessions, status: 200 })
  } catch (error) {
    console.error('Error fetching sessions2:', error)
    return NextResponse.json({
      success: false,
      error: 'Error fetching sessions2',
      status: 500
    })
  }
}
