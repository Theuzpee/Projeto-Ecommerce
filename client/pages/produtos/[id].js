import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/ProductPage.module.css';
import { useCart } from '../../context/CartContext';
import { Check } from 'lucide-react';

export default function ProductDetailPage({ product }) {
  const { addToCart } = useCart();
  const [activeImage, setActiveImage] = useState(product?.image_url_1 || '');
  const [buttonState, setButtonState] = useState('idle')

  if (!product) {
    return <p style={{ textAlign: 'center', padding: '50px' }}>Carregando...</p>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    setButtonState('added')
    setTimeout(() => {
      setButtonState('idle')
    }, 2000)
  };

  const imageGallery = [product.image_url_1, product.image_url_2].filter(Boolean);

  return (
    <>
      <Link href="/" className={styles.backLink}>&larr; Voltar para a loja</Link>
      <div className={styles.gridContainer}>
        <div className={styles.galleryContainer}>
          <div className={styles.mainImageContainer}>
            <Image
              src={activeImage || '/placeholder.png'}
              alt={product.name}
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <div className={styles.thumbnails}>
            {imageGallery.map((imgSrc, index) => (
              <div
                key={index}
                className={`${styles.thumbnail} ${activeImage === imgSrc ? styles.active : ''}`}
                onClick={() => setActiveImage(imgSrc)}
              >
                <Image src={imgSrc} alt={`Thumbnail ${index + 1}`} fill style={{ objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.infoColumn}>
          <h1 className={styles.productName}>{product.name}</h1>
          <p className={styles.description}>
            {product.description || 'Descrição não disponível.'}
          </p>
          <p className={styles.price}>
            R$ {product.price}
          </p>
          <button
            className={styles.addButton}
            onClick={handleAddToCart}
            disabled={buttonState == 'added'}
            >
            {buttonState === 'idle' ? (
              'Adicionar ao Carrinho') : (
              <>
                <Check size={20} />
                Adicionado!
              </>
            )}
        </button>
      </div>
    </div >
    </>
  );
}


export async function getStaticPaths() {
  const res = await fetch('http://localhost:3001/api/produtos');
  const products = await res.json();

  const paths = products.map((product) => ({
    params: { id: String(product.id) },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:3001/api/produtos/${params.id}`);
  const product = await res.json();

  return {
    props: {
      product,
    },
  };
}
