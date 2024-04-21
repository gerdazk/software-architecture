import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { isRequestBodyValid } from '@/src/utils/isRequestBodyValid'

import { loginSchema } from './schemas'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()
  const prisma = new PrismaClient()

  const isBodyValid = isRequestBodyValid({
    schema: loginSchema,
    body: {
      email,
      password
    }
  })

  if (!isBodyValid) {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

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
