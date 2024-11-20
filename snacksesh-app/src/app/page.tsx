import { Suspense } from "react";
import styles from "./page.module.css";
import ResultsContainer from "./components/resultsContainer";

export default function Home({ searchParams }: { searchParams: { day?: string; time?: string } }) {
  const { day, time } = searchParams;

  return (
    <div className={styles.page}>
      <h1 className={styles.appLogo}>SnackSesh</h1>
      <div className="foodNav">
        <form method="GET">
          <select name="day" defaultValue={day ?? "monday"}>
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
            <option value="weekend">Weekend</option>
          </select>
          <select name="time" defaultValue={time ?? "breakfast"}>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
          <button type="submit">Go!</button>
        </form>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <ResultsContainer day={day} time={time} />
      </Suspense>
    </div>
  );
}