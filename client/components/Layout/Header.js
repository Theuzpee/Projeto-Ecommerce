import Link from 'next/link';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import styles from './Header.module.css';
import { useCart } from '../../context/CartContext';
import { useState, useEffect } from 'react';

export default function Header() {
  const { totalItems } = useCart();

  const [isMounted, setIsMounted] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className={`${styles.header} ${isMenuOpen ? styles.menuOpen : ''}`}>
      <div className={styles.container}>

        <Link href="/" className={styles.logo}>
          TAÍKARA
        </Link>

        <nav className={styles.desktopNav}>
          <Link href="/#produtos">Produtos</Link>
          <Link href="/sobre">Novidades</Link>
          <Link href="/contato">Sales</Link>
        </nav>

        <div className={styles.actions}>
          <button className={styles.actionButton}>
            <Search size={22} />
          </button>
          <Link href="/carrinho" className={styles.cartLink}>
            <ShoppingCart size={24} />
            {isMounted && totalItems > 0 && (
              <span className={styles.cartCount}>{totalItems}</span>
            )}
          </Link>

          <button className={`${styles.actionButton} ${styles.menuButton}`} onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <nav className={`${styles.mobileNav} ${isMenuOpen ? styles.menuActive : ''}`}>
        <Link href="/#produtos" onClick={toggleMenu}>Produtos</Link>
        <Link href="/sobre" onClick={toggleMenu}>Novidades</Link>
        <Link href="/contato" onClick={toggleMenu}>Sales</Link>
      </nav>
    </header>
  );
}
