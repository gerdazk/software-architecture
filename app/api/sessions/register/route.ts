import { isRequestBodyValid } from '@/src/utils/isRequestBodyValid'
import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

import { sessionRegisterSchema } from '../schemas'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const isBodyValid =
    body && isRequestBodyValid({ schema: sessionRegisterSchema, body })

  if (!isBodyValid) {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

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
