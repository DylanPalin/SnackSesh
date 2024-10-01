import { Suspense } from "react";
import styles from "./page.module.css";
interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  location: string;
}

async function fetchRestaurants(): Promise<Restaurant[]> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/restaurants`;
  console.log("Fetching from URL:", apiUrl);

  const response = await fetch(apiUrl, {
    cache: 'no-store',
  });

  if (!response.ok) {
    console.error("Fetch failed with status:", response.status);
    throw new Error('Failed to fetch restaurants');
  }

  return response.json();
}

const RestaurantsComponent = async () => {
  let restaurants: Restaurant[] = [];
  try {
    restaurants = await fetchRestaurants();
  } catch (error) {
    console.error("Error occurred in RestaurantsComponent:", error);
    return <p>Error loading restaurants.</p>;
  }

  return (
    <ul>
      {restaurants.map((restaurant) => (
        <li key={restaurant.id}>
          <h2>{restaurant.name}</h2>
          <p>{restaurant.cuisine}</p>
          <p>{restaurant.location}</p>
        </li>
      ))}
    </ul>
  );
}

export default async function Home({ searchParams }: { searchParams: { showRestaurants?: string } }) {
  const showRestaurants = searchParams.showRestaurants === "true";
  
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div>
          <h1>Welcome to SnackSesh!</h1>
          <form method="GET">
            <button type="submit" name="showRestaurants" value="true">Show Restaurants</button>
          </form>
          {showRestaurants && (
            <Suspense fallback={<p>Loading...</p>}>
              <RestaurantsComponent />
            </Suspense>
          )}
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
