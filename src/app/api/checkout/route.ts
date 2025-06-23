import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { name, address, phone, cart } = await req.json()

  if (!name || !address || !phone || !cart || cart.length === 0) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const order = await prisma.order.create({
    data: {
      name,
      address,
      phone,
      items: {
        create: cart.map((item: any) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      },
    },
  })

  return NextResponse.json({ message: 'Order placed', orderId: order.id })
}

