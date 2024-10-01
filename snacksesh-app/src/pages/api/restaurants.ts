import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/utils/db'; // Ensure this path is correct

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      console.log("Connecting to database to fetch restaurants...");
      const restaurants = await db.selectFrom('restaurants').selectAll().execute();
      console.log("Fetched restaurants from database:", restaurants);
      res.status(200).json(restaurants);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      res.status(500).json({ error: 'Failed to fetch restaurants' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}