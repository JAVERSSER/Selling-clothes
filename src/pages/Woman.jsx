import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import CartBar from '../components/CartBar';

const initialProducts = [
  { id: 'woman-1', name: 'Tirk Dos', price: 2.5, image: '/Woman/Woman_1.png', loading: 'lazy', stock: 10, qty: 0 },
  { id: 'woman-2', name: 'Angkeadey', price: 4, image: '/Woman/Woman_2.png', loading: 'lazy', stock: 10, qty: 0 },
  { id: 'woman-3', name: 'Angkeadey', price: 3, image: '/Woman/Woman_3.png', loading: 'lazy', stock: 10, qty: 0 },
  { id: 'woman-4', name: 'Nokoreach', price: 7, image: '/Woman/Woman_4.png', loading: 'lazy', stock: 5, qty: 0 },
  { id: 'woman-5', name: 'Pkor Lorn', price: 4, image: '/Woman/Woman_5.png', loading: 'lazy', stock: 5, qty: 0 },
  { id: 'woman-6', name: 'Kolab', price: 7, image: '/Woman/Woman_6.png', loading: 'lazy', stock: 5, qty: 0 },
  { id: 'woman-7', name: 'Chhuk', price: 9, image: '/Woman/Woman_7.png', loading: 'lazy', stock: 5, qty: 0 },
  { id: 'woman-8', name: 'Chhuk', price: 2, image: '/Woman/Woman_8.png', loading: 'lazy', stock: 5, qty: 0 },
  // { id: 'woman-9', name: 'Tirk Dos', price: 2.5, image: '/Woman/Woman_9.png', loading: 'lazy', stock: 10, qty: 0 },
  // { id: 'woman-10', name: 'Angkeadey', price: 4, image: '/Woman/Woman_10.png', loading: 'lazy', stock: 10, qty: 0 },
  // { id: 'woman-11', name: 'Angkeadey', price: 3, image: '/Woman/Woman_11.png', loading: 'lazy', stock: 10, qty: 0 },
  // { id: 'woman-12', name: 'Nokoreach', price: 7, image: '/Woman/Woman_12.png', loading: 'lazy', stock: 5, qty: 0 },
  // { id: 'woman-13', name: 'Pkor Lorn', price: 4, image: '/Woman/Woman_13.png', loading: 'lazy', stock: 5, qty: 0 },
  // { id: 'woman-14', name: 'Kolab', price: 7, image: '/Woman/Woman_14.png', loading: 'lazy', stock: 5, qty: 0 },
  // { id: 'woman-15', name: 'Chhuk', price: 9, image: '/Woman/Woman_15.png', loading: 'lazy', stock: 5, qty: 0 },
  // { id: 'woman-16', name: 'Chhuk', price: 2, image: '/Woman/Woman_16.png', loading: 'lazy', stock: 5, qty: 0 },
  // { id: 'woman-17', name: 'Tirk Dos', price: 2.5, image: '/Woman/Woman_17.png', loading: 'lazy', stock: 10, qty: 0 },
  // { id: 'woman-18', name: 'Angkeadey', price: 4, image: '/Woman/Woman_18.png', loading: 'lazy', stock: 10, qty: 0 },
  // { id: 'woman-19', name: 'Angkeadey', price: 3, image: '/Woman/Woman_19.png', loading: 'lazy', stock: 10, qty: 0 },
  // { id: 'woman-20', name: 'Angkeadey', price: 3, image: '/Woman/Woman_20.png', loading: 'lazy', stock: 10, qty: 0 },
];

// Read query from URL
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Woman() {
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

  // useEffect(() => {
  //   const timer = setTimeout(() => setIsLoading(false), 500);
  //   return () => clearTimeout(timer);
  // }, []);

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
  
  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
  //     </div>
  //   );
  // }

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
      {/* {totalQty > 0 && <CartBar totalQty={totalQty} />} */}
    </div>
  );
}
