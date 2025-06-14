import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Checkout() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(stored);
  }, []);

  const handleIncrement = (id) => {
    const updated = cart.map((item) =>
      item.id === id && item.qty < item.stock
        ? { ...item, qty: item.qty + 1 }
        : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const handleDecrement = (id) => {
    const updated = cart
      .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
      .filter((item) => item.qty > 0);

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const [showPopup, setShowPopup] = useState(false);

  const handleCompleteOrder = () => {
    if (cart.length === 0) return;
    setShowPopup(true); // Show the popup when button clicked
  };

  const handleClose = () => {
    // Clear cart from localStorage
    localStorage.removeItem("cart");

    // Reset React state
    setCart([]);

    // Optional: Reset form
    setFormData({
      name: "",
      phone: "",
      email: "",
      province: "",
      message: "",
    });

    // Close the popup
    setShowPopup(false);

    // Reload the page to fully reset (optional but reliable)
    setTimeout(() => {
      window.location.reload();
    }, 100); // small delay to allow popup to close
  };

  const handleRemove = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryFee = 1.5;
  const grandTotal = total + deliveryFee;

  // Submit
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    province: "",
    message: "",
  });

  const isFormValid = () => {
    const { name, phone, email, province } = formData;

    // Simple regex for validating gmail only
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    return (
      name.trim() !== "" &&
      phone.trim() !== "" &&
      province.trim() !== "" &&
      gmailRegex.test(email)
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      // Only allow letters and spaces, and max 15 characters
      if (/[^A-Za-z\s]/.test(value) || value.length > 15) {
        return;
      }
    }

    if (name === "phone") {
      // Only allow digits, and max 11 digits (since < 12)
      if (/[^0-9]/.test(value) || value.length >= 12) {
        return;
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();

      // Build the order summary as text
      const orderDetails = cart
        .map((item) => {
          return `${item.name} x ${item.qty} = $${(
            item.qty * item.price
          ).toFixed(2)}`;
        })
        .join("\n");

      const fullOrderSummary = `
Order Details:
${orderDetails}

Subtotal: $${total.toFixed(2)}
Delivery Fee: $${deliveryFee.toFixed(2)}
Total: $${grandTotal.toFixed(2)}
    `.trim();

      // Append customer information
      form.append("name", formData.name);
      form.append("phone", formData.phone);
      form.append("email", formData.email);
      form.append("province", formData.province);
      form.append("message", formData.message);

      // Append order summary to the form
      form.append("orderSummary", fullOrderSummary); // 👈 this gets emailed too

      const response = await fetch(
        "https://formsubmit.co/ajax/thirithheng@gmail.com",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: form,
        }
      );

      const data = await response.json();

      // Clear form after submission
      setFormData({
        name: "",
        phone: "",
        email: "",
        province: "",
        message: "",
      });
    } catch (error) {
      alert("Failed to send message.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="pt-16 md:pt-20 px-4 pb-8 max-w-6xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 md:mt-4 mt-6">
            🛒 Checkout
          </h2>

          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 ">
            {/* Customer Information Form */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                Customer Information
              </h3>

              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    pattern="^[A-Za-z\s]+$"
                    className="w-full p-2 text-sm sm:text-base border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                    title="Please enter letters only"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    pattern="^[0-9]+$"
                    className="w-full p-2 text-sm sm:text-base border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                    title="Please enter numbers only"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 text-sm sm:text-base border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    title="Please enter a valid email like heng@gmail.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Province *
                  </label>
                  <div className="relative">
                    <select
                      name="province"
                      className="block pl-3 pr-10 py-2 text-sm sm:text-base bg-white border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
                      required
                      value={formData.province}
                      onChange={handleChange}
                    >
                      <option value="" disabled hidden>
                        Select Province
                      </option>
                      <option value="Phnom Penh">Phnom Penh</option>
                      <option value="Kandal">Kandal</option>
                      <option value="Kampong Cham">Kampong Cham</option>
                      <option value="Siem Reap">Siem Reap</option>
                      <option value="Preah Sihanouk">Preah Sihanouk</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Note
                  </label>
                  <textarea
                    name="message"
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-2 text-sm sm:text-base border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                Order Summary
              </h3>

              {cart.length === 0 ? (
                <p className="text-gray-600">Your cart is empty.</p>
              ) : (
                <div>
                  <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between border-b pb-3 sm:pb-4"
                      >
                        <div className="flex items-center gap-2 sm:gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded"
                          />
                          <div>
                            <h3 className="text-sm sm:text-base font-semibold">
                              {item.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-500">
                              ${item.price} each
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button
                              type="button" // <--- ADD THIS
                              onClick={() => handleDecrement(item.id)}
                              className={`px-2 sm:px-2 py-1 text-sm sm:text-base ${
                                item.qty <= 1
                                  ? "text-gray-400 cursor-not-allowed"
                                  : "text-black hover:bg-gray-100"
                              }`}
                              disabled={item.qty <= 1}
                            >
                              −
                            </button>

                            <span className="px-1 sm:px-2 py-1 border-x border-gray-300 text-center min-w-[2rem] sm:min-w-[4rem]">
                              {item.qty}
                            </span>
                            <button
                              type="button" // <--- ADD THIS
                              onClick={() => handleIncrement(item.id)}
                              className={`px-2 sm:px-2 py-1 text-sm sm:text-base ${
                                item.qty >= item.stock
                                  ? "text-gray-400 cursor-not-allowed"
                                  : "text-black hover:bg-gray-100"
                              }`}
                              disabled={item.qty >= item.stock}
                            >
                              +
                            </button>
                          </div>
                          <span className="text-sm sm:text-base font-semibold w-12 sm:w-16 text-right">
                            ${(item.price * item.qty).toFixed(2)}
                          </span>
                          <button
                            type="button" // <--- ADD THIS
                            onClick={() => handleRemove(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 sm:h-5 sm:w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 border-t pt-3 sm:pt-4">
                    <div className="flex justify-between text-sm sm:text-base">
                      <span>Subtotal:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base">
                      <span>Delivery fee:</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-base sm:text-lg mt-2 pt-2 border-t">
                      <span>Total:</span>
                      <span>${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* sumit  */}
                  <div className="relative">
                    {/* Button */}
                    <div>
                      <button
                        onClick={handleCompleteOrder}
                        className="mt-4 sm:mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 sm:py-3 rounded text-sm sm:text-base font-medium disabled:bg-gray-400"
                        disabled={cart.length === 0 || !isFormValid()} // Prevent if form invalid or cart empty
                        type="submit"
                      >
                        Complete Order
                      </button>
                    </div>

                    {/* Popup Image */}
                    {showPopup && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-4 rounded shadow-lg relative max-w-md w-full">
                          {/* Close Button */}
                          <button
                            onClick={handleClose}
                            className="absolute top-1 right-5 text-gray-500 hover:text-gray-700 text-5xl"
                          >
                            ×
                          </button>

                          {/* Save Image Icon Button */}
                          <a
                            href="qr.png"
                            download="qr.png"
                            className="absolute md:top-5 md:right-16 text-gray-500 hover:text-blue-600"
                            title="Save Image"
                          >
                            {/* Download Icon from Heroicons (SVG) */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-7 w-7"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                              />
                            </svg>
                          </a>

                          <img
                            src="qr.png"
                            alt="Order Complete"
                            className="w-full rounded mt-8"
                          />

                          {/* Order Total */}
                          <div className="bg-gray-100 p-4 rounded-lg mt-4">
                            <p className="text-gray-600">Total Amount</p>
                            <p className="text-3xl font-bold text-gray-800 mt-1">
                              ${grandTotal.toFixed(2)}
                            </p>
                          </div>

                          <button
                            onClick={handleClose}
                            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors duration-200"
                          >
                            Done
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
