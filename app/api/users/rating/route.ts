import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { userId, sessionId, rating: newRating } = body

  const prisma = new PrismaClient()

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    const { rating, numberOfRatings } = user

    const updatedRatingCount = numberOfRatings + 1
    const updatedRating =
      (rating * numberOfRatings + Number(newRating)) / updatedRatingCount

    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        rating: updatedRating,
        numberOfRatings: updatedRatingCount
      }
    })

    await prisma.userSession.updateMany({
      where: {
        userId,
        sessionId
      },
      data: {
        isUserRated: true
      }
    })

    return NextResponse.json({ success: true, status: 201 })
  } catch (error) {
    console.error('Error updating rating:', error)
    return NextResponse.json({
      success: false,
      error: 'Error updating rating',
      status: 500
    })
  }
}
