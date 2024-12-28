import { NextResponse } from 'next/server'

export async function GET() {
  try {
    return NextResponse.json('server is working!!')
  } catch (error: any) {
    console.log(error)
    return NextResponse.json(error)
  }
}
