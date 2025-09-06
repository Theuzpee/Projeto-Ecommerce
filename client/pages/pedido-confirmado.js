import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '50px 20px',
    minHeight: '60vh',
  },
  icon: {
    color: '#28a745', 
    marginBottom: '20px',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    margin: '0 0 15px 0',
    color: 'var(--on-surface)',
  },
  message: {
    fontSize: '1.2rem',
    color: 'var(--on-background)',
    maxWidth: '500px',
    marginBottom: '30px',
  },
  button: {
    backgroundColor: 'var(--primary)',
    color: '#121212',
    padding: '15px 30px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1rem',
    transition: 'transform 0.2s',
  },
};

export default function OrderConfirmationPage() {
  return (
    <div style={styles.container}>
      <CheckCircle size={80} style={styles.icon} />
      <h1 style={styles.title}>Pedido Confirmado!</h1>
      <p style={styles.message}>
        Obrigado pela sua compra! Em breve você receberá um e-mail com os detalhes do seu pedido.
      </p>
      <Link href="/" style={styles.button}>
        Voltar para a Loja
      </Link>
    </div>
  );
}
