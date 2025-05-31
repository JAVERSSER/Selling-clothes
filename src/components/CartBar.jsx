import { Link } from 'react-router-dom';

export default function CartBar({ totalQty }) {
  
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white shadow-lg border-t border-gray-200 px-6 py-3 flex justify-between items-center z-50">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 text-white" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
            />
          </svg>
          {totalQty > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {totalQty}
            </span>
          )}
        </div>
        <span className="text-white font-medium">
          {totalQty} {totalQty === 1 ? 'Item' : 'Items'}
        </span>
      </div>
      
      <Link 
        to="/checkout" 
        className={`px-5 py-2 rounded-full font-medium transition-all duration-200 ${
          totalQty > 0 
            ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        onClick={e => totalQty === 0 && e.preventDefault()}
      >
        {totalQty > 0 ? 'Checkout Now' : 'Add Items'}
      </Link>
    </div>
  );
}