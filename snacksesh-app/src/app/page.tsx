import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
      <div>
      <h1>Welcome to Food Deals App</h1>
      {/* Your homepage content here */}
    </div>
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}