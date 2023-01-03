import Head from "next/head";
import styles from "../../styles/Home.module.css";

export default function Post() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Post</title>
        <meta name="description" content="Post Content" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Post</h1>
      </main>
    </div>
  );
}
