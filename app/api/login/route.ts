import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export async function POST(req) {
  const { email, password } = await req.json()
  const prisma = new PrismaClient()

  try {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'Invalid credentials',
        status: 401
      })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return NextResponse.json({
        success: false,
        error: 'Invalid credentials',
        status: 401
      })
    }

    return NextResponse.json({ success: true, user, status: 200 })
  } catch (error) {
    console.error('Error logging in:', error)
    return NextResponse.json({
      success: false,
      error: 'Error logging in',
      status: 500
    })
  }
}
