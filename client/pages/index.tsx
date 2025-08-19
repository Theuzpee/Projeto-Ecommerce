// client/pages/index.js
import { useState, useEffect } from 'react';

export default function HomePage( ) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        // Chamamos a nova rota de produtos
        const response = await fetch('http://localhost:3001/api/produtos' );
        if (!response.ok) {
          throw new Error('Falha ao buscar dados da API');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1>Minha Loja</h1>
        <p>Os melhores produtos, direto do nosso banco de dados!</p>
      </header>

      <main>
        {isLoading && <p>Carregando produtos...</p>}
        {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
          {products.map(product => (
            <div key={product.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
              {/* No futuro, aqui teremos <img src={product.image_url} /> */}
              <h2 style={{ fontSize: '1.2em', marginBottom: '10px' }}>{product.name}</h2>
              <p style={{ fontSize: '1.1em', fontWeight: 'bold', color: '#0070f3' }}>
                R$ {product.price}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
