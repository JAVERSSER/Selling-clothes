import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import CartBar from '../components/CartBar';

const initialProducts = [
  { id: 1, name: 'Tirk Dos', price: 2.5, image: 'china1.png', stock: 10, qty: 0 },
  { id: 2, name: 'Angkeadey', price: 4, image: 'china2.png', stock: 10, qty: 0 },
  { id: 3, name: 'Angkeadey', price: 3, image: 'china3.png', stock: 10, qty: 0 },
  { id: 4, name: 'Nokoreach', price: 7, image: 'china4.png', stock: 5, qty: 0 },
  { id: 5, name: 'Pkor Lorn', price: 10, image: 'T-shirt1.png', stock: 5, qty: 0 },
  { id: 6, name: 'Kolab', price: 10, image: 'T-shirt2.png', stock: 5, qty: 0 },
  { id: 7, name: 'Chhuk', price: 10, image: 'T-shirt3.png', stock: 5, qty: 0 },
  { id: 8, name: 'Chhuk', price: 10, image: 'T-shirt4.png', stock: 5, qty: 0 },
];

export default function Home() {

  const [isLoading, setIsLoading] = useState(true);

  const [products, setProducts] = useState(() => {
    // On first render, try to get saved cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const savedProducts = JSON.parse(savedCart);
      // Merge saved qty into initialProducts by matching ids
      return initialProducts.map(p => {
        const savedItem = savedProducts.find(sp => sp.id === p.id);
        return savedItem ? { ...p, qty: savedItem.qty } : p;
      });
    }
    return initialProducts;
  });


  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleAdd = (id) => {
    setProducts(products.map(p => p.id === id ? { ...p, qty: 1 } : p));
  };

  const handleIncrement = (id) => {
    setProducts(products.map(p =>
      p.id === id && p.qty < p.stock ? { ...p, qty: p.qty + 1 } : p
    ));
  };

  const handleDecrement = (id) => {
    setProducts(products.map(p =>
      p.id === id ? { ...p, qty: Math.max(0, p.qty - 1) } : p
    ));
  };

  const totalQty = products.reduce((sum, p) => sum + p.qty, 0);

  useEffect(() => {
    const cart = products.filter(p => p.qty > 0);
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [products]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Products</h1>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={handleAdd}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
            />
          ))}
        </div>
      </div>
      <CartBar totalQty={totalQty} />
    </div>
  );
}