import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { GET_ALL_PRODUCTS_BY_CATEGORY } from "../gqloperations/queries";
function ProductByCategory() {
  const { cid } = useParams();

  const { data, loading, error } = useQuery(
    GET_ALL_PRODUCTS_BY_CATEGORY,
    {
      variables: { documentId: cid },
    }
  );

  if (loading) return <h1 className="text-center mt-10">Loading...</h1>;
  if (error) return <h1 className="text-center mt-10">Error loading products</h1>;

  return (
    <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {data?.category?.products?.map((item) => (
        <div key={item.documentId} className="bg-white shadow rounded-lg p-4">
          {item.images?.[0] && (
            <img
              src={`http://localhost:1337${item.images[0].url}`}
              alt={item.name}
              className="h-40 w-full object-contain mb-4"
            />
          )}

          <h2 className="font-semibold text-lg">{item.name}</h2>
          <p className="text-green-600 font-bold">₹{item.price}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductByCategory;