export default function ProductCard({ product, onAdd, onIncrement, onDecrement }) {
  return (
    <div className="border rounded p-4 flex flex-col items-center text-center shadow-sm">
      <img src={product.image} alt={product.name} className="w-32 h-32 object-cover" />
      <h3 className="font-semibold mt-2">{product.name}</h3>
      <p className="text-pink-600 font-bold">${product.price}</p>

      {product.stock === 0 ? (
        <button className="bg-gray-400 text-white px-4 py-1 mt-2 rounded" disabled>
          Out of stock
        </button>
      ) : product.qty > 0 ? (
        <div className="flex items-center mt-2 gap-0.5">
          <button
            onClick={() => onDecrement(product.id)}
            className="px-4 sm:px-3 py-2 text-sm sm:text-base bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-l-md border border-gray-300 transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
          >
            −
          </button>
          <span className="px-4 sm:px-4 py-2 border-t border-b border-gray-300 text-center min-w-[2.5rem] sm:min-w-[3.5rem] bg-white text-gray-800 font-medium">
            {product.qty}
          </span>
          <button
            onClick={() => onIncrement(product.id)}
            className="px-4 sm:px-3 py-2 text-sm sm:text-base bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-r-md border border-gray-300 transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
          >
            +
          </button>
        </div>
      ) : (
        <button onClick={() => onAdd(product.id)} className="bg-pink-500 text-white px-4 py-1 mt-2 rounded">
          Add to Bag
        </button>
      )}
    </div>
  );
}
