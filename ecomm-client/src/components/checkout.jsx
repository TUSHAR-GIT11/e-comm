import { useState, useEffect } from "react";
import { useCart } from "react-use-cart";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51SpWnFHL01Rv9VBlPtBwPnBZPE27VdXRNuG7X2DjRSf6MZ5ZZIpWZ1AbiZaYeDdhBrioc90CAMo4TOp5xTBy1HXa008I6iipqX"
);

/* ── Success Toast Notification ── */
const SuccessToast = ({ amount, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center gap-4 max-w-sm w-full mx-4">
        {/* Green checkmark circle */}
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-800">Payment Successful!</h2>
        <p className="text-gray-500 text-center text-sm">
          ₹{amount} paid successfully. Your order has been placed. 🎉
        </p>

        <div className="w-full bg-green-50 border border-green-200 rounded-lg p-3 text-center">
          <p className="text-green-700 font-semibold text-sm">Order Confirmed ✅</p>
          <p className="text-green-600 text-xs mt-1">Closing in 5 seconds...</p>
        </div>
      </div>
    </div>
  );
};

/* ── Main Checkout Form ── */
const CheckoutForm = () => {
  const [formData, setFormData] = useState({});
  const [payProcessing, setPayProcessing] = useState(false);
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);
  const [paidAmount, setPaidAmount] = useState(0);
  const [paybutton, setPayButton] = useState(true);
  const stripe = useStripe();
  const elements = useElements();
  const { cartTotal, items, emptyCart } = useCart();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const makePaymentRequest = async (allFormData) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:1337"}/api/orders`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(allFormData),
      });
      if (res.status !== 200) throw Error("Payment failed");
      return await res.json();
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const payload = await stripe.createToken(cardElement);

    if (payload.error) {
      console.error(payload.error.message);
      return;
    }

    const allFormData = {
      ...formData,
      token: payload.token.id,
      amount: cartTotal,
      items: items,
    };

    setPayProcessing(true);
    const result = await makePaymentRequest(allFormData);
    setPayProcessing(false);

    if (result) {
      setPaidAmount(cartTotal);
      setDone(true);
      emptyCart();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

      {/* ✅ Success popup — shown on top when done */}
      {done && <SuccessToast amount={paidAmount} onClose={() => navigate("/")} />}

      {/* ❌ Error banner */}
      {error && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2">
          <span>❌</span>
          <span className="font-semibold">Payment failed. Please try again.</span>
        </div>
      )}

      <div className="bg-white max-w-4xl w-full rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-10 p-8">

        {/* LEFT – SHIPPING */}
        <div>
          <h1 className="text-2xl font-bold mb-6">Shipping Details</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Shipping Address"
              name="shippingAddress"
              onChange={handleChange}
              required
              className="w-full border p-3 rounded"
            />
            <input
              type="text"
              placeholder="City"
              name="city"
              onChange={handleChange}
              required
              className="w-full border p-3 rounded"
            />
            <input
              type="text"
              placeholder="State"
              name="state"
              onChange={handleChange}
              required
              className="w-full border p-3 rounded"
            />
            <input
              type="number"
              placeholder="PIN Code"
              name="pin"
              onChange={handleChange}
              required
              className="w-full border p-3 rounded"
            />
          </form>
        </div>

        {/* RIGHT – PAYMENT */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-4">Payment</h2>

          <div className="border p-4 rounded mb-4 bg-white">
            <CardElement
              onChange={(e) => {
                if (e.complete) setPayButton(false);
                else setPayButton(true);
              }}
            />
          </div>

          <div className="flex justify-between mb-4 font-semibold">
            <span>Total</span>
            <span>₹{cartTotal}</span>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!stripe || !elements || paybutton || payProcessing}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {payProcessing ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Processing...
              </>
            ) : (
              `Pay ₹${cartTotal}`
            )}
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            Secure payment powered by Stripe
          </p>
        </div>
      </div>
    </div>
  );
};

const Checkout = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Checkout;
