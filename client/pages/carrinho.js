import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import styles from '../styles/CartPage.module.css';

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart();

  const subtotal = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div>
      <h1 className={styles.title}>Seu Carrinho</h1>

      {cartItems.length === 0 ? (
        <div className={styles.emptyCart}>
          <p>Seu carrinho está vazio.</p>
          <Link href="/">
            Continue comprando
          </Link>
        </div>
      ) : (
        <div className={styles.cartGrid}>
          <div className={styles.itemsList}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemImage}>
                  <Image src={item.image_url_1 || '/placeholder.png'} alt={item.name} fill style={{ objectFit: 'cover' }} />
                </div>
                <div className={styles.itemInfo}>
                  <h2 className={styles.itemName}>{item.name}</h2>
                  <p className={styles.itemPrice}>R$ {item.price.toFixed(2)}</p>
                  <p>Quantidade: {item.quantity}</p>
                  <button 
                    className={styles.removeButton} 
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <h2 className={styles.summaryTitle}>Resumo do Pedido</h2>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>R$ {subtotal.toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Frete</span>
              <span>Grátis</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
              <span>Total</span>
              <span>R$ {subtotal.toFixed(2)}</span>
            </div>
            <button className={styles.checkoutButton}>Finalizar Compra</button>
          </div>
        </div>
      )}
    </div>
  );
}
