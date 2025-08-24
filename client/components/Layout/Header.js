import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <h1>Taíkara</h1>  
      </Link>
      <nav className={styles.navLinks}>
        <Link href="/">Home</Link>
        <Link href="/carrinho">Carrinho</Link>
        <Link href="/login">Login</Link>
      </nav>
    </header>
  );
}
