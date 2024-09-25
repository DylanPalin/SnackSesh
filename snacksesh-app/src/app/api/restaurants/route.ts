import { NextResponse } from 'next/server';
import { db } from '@/utils/db.mts';

export async function GET() {
  try {
    console.log("Connecting to database to fetch restaurants...");
    const restaurants = await db.selectFrom('restaurants').selectAll().execute();
    console.log("Fetched restaurants from database:", restaurants);
    return NextResponse.json(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return NextResponse.json({ error: 'Failed to fetch restaurants' }, { status: 500 });
  }
}