import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { isRequestBodyValid } from '@/src/utils/isRequestBodyValid'

import { signUpSchema } from './schemas'

const saltRounds = 10

export async function POST(req: NextRequest) {
  const { name, email, password, requestedToBeCoach } = await req.json()

  const isBodyValid = isRequestBodyValid({
    schema: signUpSchema,
    body: {
      name,
      email,
      password,
      requestedToBeCoach
    }
  })

  if (!isBodyValid) {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const prisma = new PrismaClient()

  const hashedPassword = await bcrypt.hash(password, saltRounds)

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        requestedToBeCoach
      }
    })

    return NextResponse.json({ success: true, user, status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json({ success: false, error: error, status: 500 })
  }
}
