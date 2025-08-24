import Image from 'next/image';
import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <Image
        src="/images/backgroud.avif" 
        alt="Modelo vestindo a nova coleção"
        fill
        className={styles.heroImage}
        priority 
      />
      <div className={styles.heroContent}>
        <h1 className={styles.title}>Nova Coleção</h1>
        <p className={styles.subtitle}>Estilo e performance que inspiram.</p>
        <Link href="#produtos">
          <button className={styles.ctaButton}>Ver Produtos</button>
        </Link>
      </div>
    </section>
  );
}
