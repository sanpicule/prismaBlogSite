import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function main() {
  try {
    await prisma.$connect()
  } catch {
    return Error('接続失敗')
  }
}

export const GET = async (req: Request, res: NextResponse) => {
  try {
    await main()
    const posts = await prisma.post.findMany()
    return NextResponse.json({ message: 'success', posts }, { status: 200 })
  } catch(err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export const POST = async (req: Request, res: NextResponse) => {
  const { title, description } = await req.json()
  try {
    await main()
    const posts = await prisma.post.create({ data: { title, description } })
    return NextResponse.json({ message: 'success', posts }, { status: 201 })
  } catch(err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export const PUT = async (req: Request, res: NextResponse) => {
  const { title, description } = await req.json()
  try {
    await main()
    const posts = await prisma.post.create({ data: { title, description } })
    return NextResponse.json({ message: 'success', posts }, { status: 201 })
  } catch(err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}