import { db } from "@/utils/db";

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  location: string;
  startTime: string;
  endTime: string;
}

const getMealTimeCondition = (time: string | undefined) => {
  switch (time) {
    case "breakfast":
      return { start: "06:00:00+00", end: "12:00:00+00" };
    case "lunch":
      return { start: "12:00:00+00", end: "18:00:00+00" };
    case "dinner":
      return { start: "18:00:00+00", end: "24:00:00+00" };
    default:
      return { start: null, end: null };
  }
};

export default async function ResultsContainer({
  day,
  time,
}: {
  day?: string;
  time?: string;
}) {
  try {
    console.log(`Fetching restaurants for day: ${day} and meal time: ${time}`);

    const { start, end } = getMealTimeCondition(time);

    let query = db
      .selectFrom("deals")
      .innerJoin(
        "restaurants",
        "deals.restaurantId",
        "restaurants.restaurantId"
      )
      .selectAll("restaurants");

    if (day) {
      query.where("deals.dayOfWeek", "like", `%${day}%`);
    }

    if (start && end) {
      query = query
        .where("deals.startTime", ">=", start)
        .where("deals.endTime", "<=", end);
    }

    const result = await query.execute();

    const restaurants = result.map((item) => ({
      id: item.restaurantId,
      name: item.name,
      cuisine: item.cuisineType ?? "Unknown",
      location: item.address ?? "Unknown",
    }));

    return (
      <div className="results">
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
    );
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return <p>Error loading restaurants.</p>;
  }
}
