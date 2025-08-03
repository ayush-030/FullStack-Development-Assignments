import React, { useState } from 'react';

export default function EcommerceStore() {
  const products = [
    {
      id: 1,
      name: "Vintage Camera",
      price: 3999.00,
      image: "./UsedImages/VintageCamera.png",
      description: "A classic camera for a timeless photo.",
    },
    {
      id: 2,
      name: "Handmade Mug",
      price: 499.00,
      image: "./UsedImages/HandmadeMug.png",
      description: "Crafted with care for your morning brew.",
    },
    {
      id: 3,
      name: "Leather Journal",
      price: 1299.00,
      image: "./UsedImages/LeatherJournal.png",
      description: "Your thoughts deserve a beautiful home.",
    },
    {
      id: 4,
      name: "Bluetooth Speaker",
      price: 3499.00,
      image: "./UsedImages/BluetoothSpeaker.png",
      description: "Crisp sound in a compact design.",
    },
  ];

  
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  /**
   * Adds a product to the cart.
    @param {object} product - The product to add.
   */
  const addToCart = (product) => {
    
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
   
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  /**
   * Removes a product from the cart.
   * @param {number} productId - The ID of the product to remove.
   */
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  
  const totalItemsInCart = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  
  const useCurrencyFormatter = () => {
    const formatter = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    });
    return formatter.format;
  };

  const formatCurrency = useCurrencyFormatter();

  return (
    <div className="bg-gray-50 font-sans text-gray-800 min-h-screen">
    
      <Header
        totalItems={totalItemsInCart}
        onCartClick={() => setIsCartOpen(true)}
      />

      <main className="w-full">
        <div className="mx-auto p-6 lg:p-12 max-w-7xl">
          <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Featured Products
          </h1>
          {/* Product List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                isInCart={cartItems.some((item) => item.id === product.id)}
                formatCurrency={formatCurrency}
              />
            ))}
          </div>
        </div>
      </main>

      {isCartOpen && (
        <CartModal
          cartItems={cartItems}
          onClose={() => setIsCartOpen(false)}
          onRemoveFromCart={removeFromCart}
          formatCurrency={formatCurrency}
        />
      )}
    </div>
  );
}


function Header({ totalItems, onCartClick }) {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50 w-full">
      <nav className="mx-auto p-4 flex justify-between items-center max-w-7xl">
        <a href="#" className="text-2xl font-extrabold text-indigo-600 tracking-wider">
          ShopSwift
        </a>
        <button
          onClick={onCartClick}
          className="relative p-2 rounded-full text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
        >
          {/* Lucide Cart icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-shopping-cart"
          >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
        
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              {totalItems}
            </span>
          )}
        </button>
      </nav>
    </header>
  );
}

function ProductCard({ product, onAddToCart, isInCart, formatCurrency }) {
  const { name, price, image, description } = product;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col group">
   
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
      />

      <div className="p-6 flex flex-col flex-grow">
        {/* Product Details */}
        <h3 className="text-xl font-semibold mb-2 text-gray-900">{name}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold text-indigo-600">
            {formatCurrency(price)}
          </span>

          <button
            onClick={() => onAddToCart(product)}
            disabled={isInCart}
            className={`
              font-semibold py-2 px-4 rounded-full transition-all duration-300
              ${
                isInCart
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              }
            `}
          >
            {isInCart ? "In Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}


function CartModal({ cartItems, onClose, onRemoveFromCart, formatCurrency }) {
  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex justify-end">
      {/* Modal Overlay */}
      <div
        className="absolute inset-0"
        onClick={onClose}
      ></div>

      {/* Cart Content */}
      <div className="bg-white w-full max-w-sm h-full overflow-y-auto transform transition-transform duration-300 ease-in-out translate-x-0 rounded-l-xl shadow-2xl p-6 flex flex-col">
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
          
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-x"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

       
        <div className="flex-grow mt-6 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Your cart is empty.
            </p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-gray-50 rounded-lg p-3"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div className="flex-grow">
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-bold text-indigo-600">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                  <button
                    onClick={() => onRemoveFromCart(item.id)}
                    className="text-red-500 text-sm hover:text-red-700 transition-colors duration-200 mt-1"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

   
        <div className="mt-auto pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Subtotal:</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <button className="w-full mt-4 py-3 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
