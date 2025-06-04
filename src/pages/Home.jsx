import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import CartBar from '../components/CartBar';

const initialProducts = [
  { id: 'home-1', name: 'Tirk Dos', price: 2.5, image: '/Home/Home1.png', stock: 10, qty: 0 },
  { id: 'home-2', name: 'Angkeadey', price: 4, image: '/Home/Home2.png', stock: 10, qty: 0 },
  { id: 'home-3', name: 'Angkeadey', price: 3, image: '/Home/Home3.png', stock: 10, qty: 0 },
  { id: 'home-4', name: 'Nokoreach', price: 7, image: '/Home/Home4.png', stock: 5, qty: 0 },
  { id: 'home-5', name: 'Pkor Lorn', price: 8, image: '/Home/Home5.png', stock: 5, qty: 0 },
  { id: 'home-6', name: 'Kolab', price: 3, image: '/Home/Home6.png', stock: 5, qty: 0 },
  { id: 'home-7', name: 'Chhuk', price: 1.5, image: '/Home/Home7.png', stock: 5, qty: 0 },
  { id: 'home-8', name: 'Chhuk', price: 9, image: '/Home/Home8.png', stock: 5, qty: 0 },
  { id: 'home-9', name: 'Tirk Dos', price: 2.5, image: '/Home/Home9.png', stock: 10, qty: 0 },
  { id: 'home-10', name: 'Angkeadey', price: 4, image: '/Home/Home10.png', stock: 10, qty: 0 },
  { id: 'home-11', name: 'Angkeadey', price: 3, image: '/Home/Home11.png', stock: 10, qty: 0 },
  { id: 'home-12', name: 'Nokoreach', price: 7, image: '/Home/Home12.png', stock: 5, qty: 0 },
  { id: 'home-13', name: 'Pkor Lorn', price: 8, image: '/Home/Home13.png', stock: 5, qty: 0 },
  { id: 'home-14', name: 'Kolab', price: 3, image: '/Home/Home14.png', stock: 5, qty: 0 },
  { id: 'home-15', name: 'Chhuk', price: 1.5, image: '/Home/Home15.png', stock: 5, qty: 0 },
  { id: 'home-16', name: 'Chhuk', price: 9, image: '/Home/Home16.png', stock: 5, qty: 0 },
  { id: 'home-17', name: 'Tirk Dos', price: 2.5, image: '/Home/Home17.png', stock: 10, qty: 0 },
  { id: 'home-18', name: 'Angkeadey', price: 4, image: '/Home/Home18.png', stock: 10, qty: 0 },
  { id: 'home-19', name: 'Angkeadey', price: 3, image: '/Home/Home19.png', stock: 10, qty: 0 },
  { id: 'home-20', name: 'Nokoreach', price: 7, image: '/Home/Home20.png', stock: 5, qty: 0 },
  { id: 'home-21', name: 'Pkor Lorn', price: 8, image: '/Home/Home21.png', stock: 5, qty: 0 },
  { id: 'home-22', name: 'Kolab', price: 3, image: '/Home/Home22.png', stock: 5, qty: 0 },
  { id: 'home-23', name: 'Chhuk', price: 1.5, image: '/Home/Home23.png', stock: 5, qty: 0 },
  { id: 'home-24', name: 'Chhuk', price: 9, image: '/Home/Home24.png', stock: 5, qty: 0 },
  { id: 'home-25', name: 'Angkeadey', price: 4, image: '/Home/Home25.png', stock: 10, qty: 0 },
  { id: 'home-26', name: 'Angkeadey', price: 3, image: '/Home/Home26.png', stock: 10, qty: 0 },
  { id: 'home-27', name: 'Nokoreach', price: 7, image: '/Home/Home27.png', stock: 5, qty: 0 },
  { id: 'home-28', name: 'Pkor Lorn', price: 8, image: '/Home/Home28.png', stock: 5, qty: 0 },
  { id: 'home-29', name: 'Kolab', price: 3, image: '/Home/Home29.png', stock: 5, qty: 0 },
  { id: 'home-30', name: 'Chhuk', price: 1.5, image: '/Home/Home30.png', stock: 5, qty: 0 },
  { id: 'home-31', name: 'Chhuk', price: 9, image: '/Home/Home31.png', stock: 5, qty: 0 },
  { id: 'home-32', name: 'Chhuk', price: 9, image: '/Home/Home32.png', stock: 5, qty: 0 },
  { id: 'home-33', name: 'Chhuk', price: 9, image: '/Home/Home33.png', stock: 5, qty: 0 },
  { id: 'home-34', name: 'Chhuk', price: 9, image: '/Home/Home34.png', stock: 5, qty: 0 },
];

// Read query from URL
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Home() {
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
