import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Nayuta's Blog</title>
        <meta name="description" content="Blog site of Nayuta" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Nextjs Blog
        </h1>
      </main>
    </div>
  )
}
