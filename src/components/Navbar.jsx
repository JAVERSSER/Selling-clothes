import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Memoize toggleMenu to avoid recreating the function every render
  const toggleMenu = useCallback(() => setMenuOpen(open => !open), []);

  // Memoize search handler
  const handleSearch = useCallback(() => {
    const trimmed = searchQuery.trim();
    if (trimmed === "") {
      navigate("/"); // default home
    } else {
      navigate(`/?query=${encodeURIComponent(trimmed)}`);
    }
    setMenuOpen(false);
  }, [navigate, searchQuery]);

  // Use callback here too for better performance on input keyDown
  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  }, [handleSearch]);

  // Use a stable handler for input change to avoid unnecessary renders on controlled input
  const onChangeSearchQuery = useCallback(e => {
    setSearchQuery(e.target.value);
  }, []);

  return (
    <div>
      <div className="fixed top-0 left-0 w-full bg-white shadow z-50 px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-pink-500 text-2xl font-bold">
          Heng Thirith Shop
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-20 text-[1rem] mx-auto font-bold">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/man">Man</Link>
          </li>
          <li>
            <Link to="/woman">Woman</Link>
          </li>
        </ul>

        {/* Desktop Search & Cart */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center border rounded-full px-2 py-1">
            <input
              type="text"
              value={searchQuery}
              onChange={onChangeSearchQuery}
              onKeyDown={handleKeyDown}
              placeholder="Search..."
              className="outline-none text-sm px-2 w-32"
              aria-label="Search products"
            />
            <button onClick={handleSearch} aria-label="Search button">
              <Search size={20} className="text-pink-500" />
            </button>
          </div>
          <Link to="/checkout" className="text-pink-500 text-2xl" aria-label="Go to checkout">
            🛒
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label={menuOpen ? "Close menu" : "Open menu"}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow px-6 pt-4 pb-6 space-y-4 fixed top-16 left-0 w-full z-40">
          <ul className="flex flex-col font-bold">
            <li>
              <Link
                to="/"
                onClick={toggleMenu}
                className="block w-full px-4 py-3 rounded hover:bg-pink-100 active:bg-pink-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/man"
                onClick={toggleMenu}
                className="block w-full px-4 py-3 rounded hover:bg-pink-100 active:bg-pink-200"
              >
                Man
              </Link>
            </li>
            <li>
              <Link
                to="/woman"
                onClick={toggleMenu}
                className="block w-full px-4 py-3 rounded hover:bg-pink-100 active:bg-pink-200"
              >
                Woman
              </Link>
            </li>
            <li>
              <Link
                to="/checkout"
                onClick={toggleMenu}
                className="block w-full px-4 py-3 rounded hover:bg-pink-100 active:bg-pink-200"
              >
                🛒 Checkout
              </Link>
            </li>
          </ul>

          {/* Mobile Search */}
          <div className="flex items-center border rounded-full px-2 py-1">
            <input
              type="text"
              value={searchQuery}
              onChange={onChangeSearchQuery}
              onKeyDown={handleKeyDown}
              placeholder="Search..."
              className="outline-none text-sm px-2 w-full"
              aria-label="Search products"
            />
            <button onClick={handleSearch} aria-label="Search button">
              <Search size={20} className="text-pink-500" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
