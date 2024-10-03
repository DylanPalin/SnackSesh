import { db } from "@/utils/db";
import { Suspense } from "react";
import styles from "./page.module.css";

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  location: string;
}

// Integrated fetchRestaurants function
async function fetchRestaurants(): Promise<Restaurant[]> {
  try {
    console.log("Connecting to database to fetch restaurants...");
    const result = await db.selectFrom('restaurants').selectAll().execute();
    const restaurants = result.map((item: { restaurantId: number; name: string; cuisineType: string | null; address: string | null }) => ({
      id: item.restaurantId,
      name: item.name,
      cuisine: item.cuisineType ?? "Unknown",
      location: item.address ?? "Unknown",
    }));
    return restaurants;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw new Error('Failed to fetch restaurants');
  }
}

const RestaurantsComponent = async () => {
  try {
    const restaurants = await fetchRestaurants();
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
  } catch (error) {
    console.error("Error occurred in RestaurantsComponent:", error);
    return <p>Error loading restaurants.</p>;
  }
};

export default async function Home({ searchParams }: { searchParams: { showRestaurants?: string } }) {
  const showRestaurants = searchParams.showRestaurants === "true";
  
  return (
    <div className={styles.page}>
      <h1 className={styles.appLogo}>SnackSesh</h1>
        <div className="foodNav">
          <form method="GET">
            <select name="day">
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="weekend">Weekend</option>
            </select>
            <select name="time">
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
            </select>
            <button type="submit" name="showRestaurants" value={showRestaurants ? "false" : "true"}>
              {showRestaurants ? "Hide Restaurants" : "Show Restaurants"}
            </button>
          </form>
          </div>
        <Suspense fallback={<p>Loading...</p>}>
          {showRestaurants && <RestaurantsComponent />}
        </Suspense>
    </div>
  );
}
