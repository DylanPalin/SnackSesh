import axios from 'axios';
import fs from 'fs/promises';

// Define the Overpass API endpoint
const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';

// Define the Overpass QL query
const overpassQuery = `
[out:json][timeout:25];
area[name="Edmonton"]->.searchArea;
(
  node["amenity"="restaurant"](area.searchArea);
  way["amenity"="restaurant"](area.searchArea);
  relation["amenity"="restaurant"](area.searchArea);
);
out center tags;
`;

// Define TypeScript interfaces
interface Tags {
  name?: string;
  phone?: string;
  'contact:phone'?: string;
  website?: string;
  'contact:website'?: string;
  'addr:full'?: string;
  'addr:housenumber'?: string;
  'addr:street'?: string;
  cuisine?: string;
}

interface Element {
  type: string;
  id: number;
  lat?: number;
  lon?: number;
  tags?: Tags;
  center?: {
    lat: number;
    lon: number;
  };
}

// Function to fetch data
const fetchRestaurants = async () => {
  try {
    const response = await axios.post<{ elements: Element[] }>(OVERPASS_URL, `data=${encodeURIComponent(overpassQuery)}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const elements = response.data.elements;
    const restaurantData = elements.map((elem: Element) => {
      const tags = elem.tags || {};
      const name = tags.name || 'Unnamed Restaurant';
      const phone = tags.phone || tags['contact:phone'] || null;
      const website = tags.website || tags['contact:website'] || null;
      const address = tags['addr:full'] || `${tags['addr:housenumber'] || ''} ${tags['addr:street'] || ''}`.trim();
      const cuisine = tags.cuisine || 'Unknown';
      const lat = elem.lat || (elem.center && elem.center.lat);
      const lon = elem.lon || (elem.center && elem.center.lon);

      if (name && lat !== undefined && lon !== undefined) {
        return {
          Name: name,
          Address: address,
          Phone: phone,
          Website: website,
          Cuisine: cuisine,
          Latitude: lat,
          Longitude: lon,
          Photo: null, // Optionally include a default photo or URL
          Deals: [] // Prepare to store deals
        };
      }
      return null;
    }).filter(item => item !== null);

    // Save to JSON
    await fs.writeFile('edmonton_restaurants.json', JSON.stringify(restaurantData, null, 2));
    console.log('Data fetched and saved to edmonton_restaurants.json');
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Axios error has a response property
      console.error('Error fetching data:', error.response ? error.response.data : error.message);
    } else {
      // Generic error encoding
      console.error('An unexpected error occurred:', error);
    }
  }
};

// Execute the function if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  fetchRestaurants();
}