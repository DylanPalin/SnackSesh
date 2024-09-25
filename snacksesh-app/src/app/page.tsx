'use client';

import styles from "./page.module.css";
import { useState } from "react";

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  location: string;
  // Add other fields as necessary
}

export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const handleClick = async () => {
    console.log("Fetching restaurants...");
    try {
      const response = await fetch('/api/restaurants');
      if (!response.ok) {
        console.error("Fetch error:", response.statusText);
        return;
      }

      const data = await response.json();
      console.log("Fetched restaurants:", data);
      setRestaurants(data);
    } catch (error) {
      console.error("Error occurred fetching restaurants:", error);
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div>
          <h1>Welcome to SnackSesh!</h1>
          <div className="container">
            <button onClick={handleClick}>Get Restaurants</button>
          </div>
          <ul>
            {restaurants.map((restaurant) => (
              <li key={restaurant.id}>
                <h2>{restaurant.name}</h2>
                <p>{restaurant.cuisine}</p>
                <p>{restaurant.location}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}