import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main className="fade-in-content" style={{ padding: '20px', minHeight: '80vh' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
