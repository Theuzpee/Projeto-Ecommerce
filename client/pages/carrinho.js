import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import styles from '../styles/CartPage.module.css';
import { useRouter} from 'next/router'

export default function CartPage() {
  const router = useRouter()
  const { cartItems, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = useCart();

  const subtotal = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const handleCheckout = ()=> {
    console.log('Pedido finalizado', cartItems)

    clearCart()

    router.push('/pedido-confirmado')
  }

  const handleRemoveItem = (e, itemId) => {
    const itemElement = e.target.closest(`.${styles.cartItem}`);
    
    if (itemElement) {
      itemElement.classList.add(styles.removing);

      setTimeout(() => {
        removeFromCart(itemId);
      }, 400);
    }
  };

  return (
    <div className={styles.pageContainer}>
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
                  <div className={styles.quantityControls}>
                    <button onClick={() => decrementQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => incrementQuantity(item.id)}>+</button>
                  </div>
                  <button
                    className={styles.removeButton}
                    onClick={(e) => handleRemoveItem(e, item.id)}
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
            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
              <span>Total</span>
              <span>R$ {subtotal.toFixed(2)}</span>
            </div>
            <button className={styles.checkoutButton} onClick={handleCheckout}>
              Finalizar Compra
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
