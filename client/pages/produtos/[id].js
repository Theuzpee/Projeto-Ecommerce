import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/ProductPage.module.css';
import { useCart } from '../../context/CartContext';

export default function ProductDetailPage() {
  const { addToCart } = useCart();
  
  const router = useRouter(); 
  const { id } = router.query; 

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState('');
  
  useEffect(() => {
    if (router.isReady && id) {
      async function fetchProduct() {
        try {
          const response = await fetch(`http://localhost:3001/api/produtos/${id}` );
          if (!response.ok) {
            throw new Error('Produto não encontrado ou falha na API');
          }
          const data = await response.json();
          setProduct(data);
          if (data && data.image_url_1) {
            setActiveImage(data.image_url_1);
          }
        } catch (err) {
          console.error("Erro detalhado:", err);
          setError(err instanceof Error ? err.message : 'Ocorreu um erro.');
        } finally {
          setIsLoading(false);
        }
      }
      fetchProduct();
    } else if (router.isReady && !id) {
      setIsLoading(false);
      setError("ID do produto não fornecido na URL.");
    }
  }, [id, router.isReady]);

  if (!router.isReady || isLoading) {
    return <p style={{ textAlign: 'center', padding: '50px' }}>Carregando...</p>;
  }

  if (error) {
    return <p style={{ color: 'red', textAlign: 'center', padding: '50px' }}>Erro: {error}</p>;
  }

  if (!product) {
    return <p style={{ textAlign: 'center', padding: '50px' }}>Produto não encontrado.</p>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} foi adicionado ao carrinho!`); 
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
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </>
  );
}
