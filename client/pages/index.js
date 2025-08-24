// client/pages/index.js
import { useState, useEffect } from 'react';
import ProductCard from '../components/products/ProductCard';
import Hero from '../components/home/Hero';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('http://localhost:3001/api/produtos');
        if (!response.ok) {
          throw new Error('Falha ao buscar dados da API');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {

        if (err instanceof Error) {
          setError(err.message);
        } else {

          setError('Ocorreu um erro inesperado');
        }
        console.error("Erro detalhado ao buscar produtos:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const validProducts = products ? products.filter(p => p && p.id) : [];

  return (
    <>
      <Hero />

      <section id="produtos" style={{ padding: '4rem 5%' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '40px', textTransform: 'uppercase' }}>
          Destaques
        </h2>
        <main>
          {isLoading && <p>Carregando produtos...</p>}
          {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
            {validProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </section>
    </>
  );
}