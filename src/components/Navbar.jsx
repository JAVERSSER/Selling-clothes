import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div>
      <div className="fixed top-0 left-0 w-full bg-white shadow z-50 px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-pink-500 text-2xl font-bold">Heng Thirith Shop</Link>
        <div className="relative">
          <span className="text-pink-500 text-2xl">
            <Link to="/checkout">🛒</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar