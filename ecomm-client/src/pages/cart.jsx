import { useCart } from "react-use-cart";
import Checkout from "../components/checkout";
import { useState } from "react";
function Cart() {
  const { isEmpty, items, cartTotal, updateItemQuantity, removeItem } =
    useCart();
  const [checkout, setCheckout] = useState(false);

  if(checkout){
    return(
      <div>
        <h1>payment page</h1>
        <Checkout/>
        <button onClick={()=>setCheckout(false)}>Cancel</button>
      </div>
    )
  }

  if (isEmpty)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-500">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty 🛒</h1>
        <p>Start shopping to add items to your cart.</p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* LEFT - CART ITEMS */}
      <div className="lg:col-span-2 space-y-6">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow p-4 flex gap-6"
          >
            {/* IMAGE */}
            <img
              src={item.image}
              alt={item.name}
              className="w-28 h-28 object-contain bg-gray-100 rounded-lg"
            />

            {/* DETAILS */}
            <div className="flex flex-col flex-grow">
              <h2 className="font-semibold text-lg mb-2">{item.name}</h2>

              <p className="text-green-600 font-bold mb-2">₹{item.price}</p>

              {/* QUANTITY */}
              <div className="flex items-center gap-3 mb-3">
                <button
                  onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                  className="px-3 py-1 border rounded hover:bg-gray-100"
                >
                  −
                </button>

                <span className="font-semibold">{item.quantity}</span>

                <button
                  onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                  className="px-3 py-1 border rounded hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              <p className="text-gray-600 text-sm">
                Subtotal:{" "}
                <span className="font-semibold">₹{item.itemTotal}</span>
              </p>
            </div>

            {/* REMOVE */}
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-500 hover:underline text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* RIGHT - ORDER SUMMARY */}
      <div className="bg-white shadow rounded-xl p-6 h-fit">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

        <div className="flex justify-between mb-3">
          <span>Total Items</span>
          <span>{items.length}</span>
        </div>

        <div className="flex justify-between mb-3">
          <span>Total Price</span>
          <span className="font-semibold">₹{cartTotal}</span>
        </div>

        <hr className="my-4" />

        <button
          onClick={() => setCheckout(true)}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
