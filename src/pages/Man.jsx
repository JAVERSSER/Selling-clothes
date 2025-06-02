import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import CartBar from '../components/CartBar';

const initialProducts = [
  { id: 'man-1', name: 'Tirk Dos', price: 2.5, image: '/Man/Man1.png', loading: 'lazy', stock: 10, qty: 0 },
  { id: 'man-2', name: 'Angkeadey', price: 4, image: '/Man/Man2.png', loading: 'lazy', stock: 10, qty: 0 },
  { id: 'man-3', name: 'Angkeadey', price: 3, image: '/Man/Man3.png', loading: 'lazy', stock: 10, qty: 0 },
  { id: 'man-4', name: 'Nokoreach', price: 7, image: '/Man/Man4.png', loading: 'lazy', stock: 5, qty: 0 },
  { id: 'man-5', name: 'Pkor Lorn', price: 10, image: '/Man/Man5.png', loading: 'lazy', stock: 5, qty: 0 },
  { id: 'man-6', name: 'Kolab', price: 10, image: '/Man/Man6.png', loading: 'lazy', stock: 5, qty: 0 },
  { id: 'man-7', name: 'Chhuk', price: 10, image: '/Man/Man7.png', loading: 'lazy', stock: 5, qty: 0 },
  { id: 'man-8', name: 'Chhuk', price: 10, image: '/Man/Man8.png', loading: 'lazy', stock: 5, qty: 0 },
];

// Read query from URL
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Man() {
  const [isLoading, setIsLoading] = useState(true);
  const query = useQuery().get('query')?.toLowerCase() || '';

  const [products, setProducts] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const savedProducts = JSON.parse(savedCart);
      return initialProducts.map(p => {
        const savedItem = savedProducts.find(sp => sp.id === p.id);
        return savedItem ? { ...p, qty: savedItem.qty } : p;
      });
    }
    return initialProducts;
  });

  // Filter by search keyword
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(query)
  );

  useEffect(() => {
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
    // Get current cart from localStorage
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');

    // Update savedCart with current products quantities for this page
    const newCart = [...savedCart];

    products.forEach(product => {
      const index = newCart.findIndex(p => p.id === product.id);
      if (product.qty > 0) {
        if (index > -1) {
          // Update existing product qty
          newCart[index] = { ...newCart[index], qty: product.qty };
        } else {
          // Add new product from this page
          newCart.push({ id: product.id, qty: product.qty, name: product.name, price: product.price, image: product.image, stock: product.stock });
        }
      } else {
        // qty == 0: remove from cart if exists
        if (index > -1) {
          newCart.splice(index, 1);
        }
      }
    });

    localStorage.setItem('cart', JSON.stringify(newCart));
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
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Products</h1>

        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">No products found for "{query}"</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={handleAdd}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
              />
            ))}
          </div>
        )}
      </div>
      <CartBar totalQty={totalQty} />
    </div>
  );
}
