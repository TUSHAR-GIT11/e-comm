import { useParams } from "react-router-dom";
import { GET_PRODUCT_BY_ID } from "../gqloperations/queries";
import { useQuery } from "@apollo/client/react";
import { useCart } from "react-use-cart";
function Product() {
  const { pid } = useParams();
  const { addItem } = useCart();

  const { loading, error, data } = useQuery(GET_PRODUCT_BY_ID, {
    variables: {
      documentId: pid,
    },
  });

  if (loading) return <h1 className="text-center mt-10">Loading...</h1>;
  if (error) return <h1 className="text-center mt-10">Something went wrong</h1>;

  const product = data.product;
  const addToCart = () => {
    addItem({
      id: product.documentId,
      name: product.name,
      price: product.price,
      image: product.images?.[0]
        ? `http://localhost:1337${product.images[0].url}`
        : "",
    });
    console.log("Added:", product.documentId);
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* IMAGE SECTION */}
        <div className="bg-gray-100 rounded-xl p-6 flex items-center justify-center">
          {product.images?.[0] && (
            <img
              src={`http://localhost:1337${product.images[0].url}`}
              alt={product.name}
              className="max-h-96 object-contain"
            />
          )}
        </div>

        {/* PRODUCT DETAILS */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          <p className="text-2xl text-green-600 font-semibold mb-6">
            ₹{product.price}
          </p>

          {/* DESCRIPTION */}
          <div className="text-gray-700 space-y-3 mb-6">
            {product.description?.map((block, i) => (
              <p key={i}>{block.children?.map((child) => child.text)}</p>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="flex gap-4">
            <button
              onClick={addToCart}
              className="flex-1 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>

            <button className="flex-1 border border-black py-3 rounded-lg hover:bg-gray-100 transition">
              Buy Now
            </button>
          </div>

          {/* EXTRA INFO */}
          <div className="mt-6 border-t pt-4 text-sm text-gray-500">
            <p>✔ Free Delivery</p>
            <p>✔ 7 Days Replacement</p>
            <p>✔ Secure Payment</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
