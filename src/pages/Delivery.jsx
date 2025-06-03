import React from "react";

const Delivery = () => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-between bg-white text-center text-gray-700">
      {/* Main Message */}
      <div className="flex-grow flex items-center justify-center">
        <p className="text-lg">You don't have any orders yet.</p>
      </div>

      {/* Footer */}
      <footer className="w-full text-sm text-gray-600 pb-6">
        <div className="text-center mb-1">
          Tel:{" "}
          <a href="tel:069297337" className="text-blue-600 hover:underline">
            069-297-337
          </a>{" "}
          &nbsp;
          <img src="telegram.png" alt="J&T" className="inline-block h-5 mx-1" />
          <a
            href="https://t.me/HTR7337" // Replace with actual Telegram link
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Telegram (Click here)
          </a>
        </div>
        <div className="text-center">
          Copyright© 2025, <strong>Heng Thirith</strong>
        </div>
        <div className="text-center mt-1">
          We accept:&nbsp;
          <img src="J&T.png" alt="J&T" className="inline-block h-5 mx-1" />
          <img src="khqr.png" alt="KHQR" className="inline-block h-5 mx-1" />
        </div>
      </footer>
    </div>
  );
};

export default Delivery;
