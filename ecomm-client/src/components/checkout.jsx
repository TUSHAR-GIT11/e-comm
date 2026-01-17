import { useState } from "react";
import { useCart } from "react-use-cart";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
const stripePromise = loadStripe(
  "pk_test_51SpWnFHL01Rv9VBlPtBwPnBZPE27VdXRNuG7X2DjRSf6MZ5ZZIpWZ1AbiZaYeDdhBrioc90CAMo4TOp5xTBy1HXa008I6iipqX",
);

const CheckoutForm = () => {
  const [formData, setFormData] = useState({});
  const [payProcessing, setPayProcessing] = useState(false);
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);
  const [paybutton, setPayButton] = useState(true);
  const stripe = useStripe();
  const elements = useElements();
  const { cartTotal, items, emptyCart } = useCart();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const makePaymentRequest = async (allFormData) => {
    try {
      const res = await fetch(`http://localhost:1337/api/orders`, {
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
      alert("Payment failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

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
    await makePaymentRequest(allFormData);
    setDone(true);
    setPayProcessing(false);
    emptyCart();
  };

  if (error)
    return (
      <h1 className="text-center mt-10 text-red-600 text-xl font-semibold">
        ❌ Something went wrong during payment.
      </h1>
    );

  if (done)
    return (
      <h1 className="text-center mt-10 text-green-600 text-xl font-semibold">
        ✅ Payment Successful! Your order has been placed.
      </h1>
    );

  if (payProcessing)
    return (
      <h1 className="text-center mt-10 text-blue-600 text-xl font-semibold">
        ⏳ Processing Payment...
      </h1>
    );

  // allFormData moved into handleSubmit where `payload` is available

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
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
                if (e.complete) {
                  setPayButton(false);
                }
              }}
            />
          </div>

          <div className="flex justify-between mb-4 font-semibold">
            <span>Total</span>
            <span>₹{cartTotal}</span>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!stripe || !elements || paybutton}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Pay ₹{cartTotal}
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            Secure payment powered by Stripe
          </p>
        </div>
      </div>
    </div>
  );
};

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
