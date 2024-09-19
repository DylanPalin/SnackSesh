import axios from 'axios';

export default async function handler(req, res) {
  const { location } = req.query;

  try {
    const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
      headers: {
        Authorization: `Bearer YOUR_YELP_API_KEY`,
      },
      params: {
        location,
        categories: 'restaurants',
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from Yelp' });
  }
}