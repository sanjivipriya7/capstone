
import { NextResponse } from 'next/server';

let products: any[] = [];

export async function POST(req: Request) {
  const body = await req.json();
  products.push(body);
  return NextResponse.json({ success: true });
}

export async function GET() {
  return NextResponse.json(products);
}
