import Link from 'next/link';
import Image from 'next/image';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  if (!product || !product.id) {
    return null;
  }

  const hoverImageSrc = product.image_url_2 || product.image_url_1;

  return (
    <Link href={`/produtos/${product.id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={product.image_url_1 || '/placeholder.png'}
          alt={product.name}
          fill
          className={styles.productImage}
        />

        <Image
          src={hoverImageSrc}
          alt={`${product.name} - vista alternativa`}
          fill
          className={`${styles.productImage} ${styles.imageHover}`}
        />
      </div>
      <div className={styles.info}>
        <h2 className={styles.name}>{product.name}</h2>
        <p className={styles.price}>R$ {product.price}</p>
      </div>
    </Link>
  );
}
