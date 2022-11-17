import Head from "next/head";
import styles from "../../styles/Home.module.css";

export default function Article() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Article</title>
        <meta name="description" content="Article Content" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Article</h1>
      </main>
    </div>
  );
}
