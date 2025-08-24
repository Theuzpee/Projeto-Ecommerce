import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        &copy; {currentYear} Taíkara. Todos os direitos reservados.
      </p>
    </footer>
  );
}
