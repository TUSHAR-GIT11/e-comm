import { useState } from "react";
import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client/react";
import { Link } from "react-router-dom";

import { GET_PRODUCT_BY_NAME } from "../gqloperations/queries";
function Search() {
  const [nameQuery, setNameQuery] = useState("");
  const [hideResult, setHideResult] = useState(true);
  const [getProduct, { data, loading, error }] =
    useLazyQuery(GET_PRODUCT_BY_NAME);

 useEffect(() => {
  if (!nameQuery.trim()) {
    setHideResult(true);
    return;
  }

  const timer = setTimeout(() => {
    getProduct({
      variables: {
        filters: {
          name: {
            startsWith: nameQuery,
          },
        },
      },
    });
    setHideResult(false);
  }, 1000);

  return () => clearTimeout(timer);
}, [nameQuery, getProduct]);

   
 const handleChange = (e) => {
  setNameQuery(e.target.value); // ✅ immediate update
};


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
 return (
  <div className="relative w-full max-w-xl mx-auto">
    {/* SEARCH INPUT */}
    <div className="flex items-center bg-white border border-gray-300 rounded-full shadow-sm focus-within:ring-2 focus-within:ring-green-500">
      <input
        type="text"
        value={nameQuery}
        onChange={handleChange}
        placeholder="Search for products..."
        className="w-full px-5 py-3 rounded-full outline-none text-sm"
      />

      {/* SEARCH ICON */}
      <div className="px-4 text-gray-500">
        🔍
      </div>
    </div>

    {/* DROPDOWN RESULTS */}
    {!hideResult && (
      <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
        {loading && (
          <p className="px-4 py-3 text-sm text-gray-500">Searching...</p>
        )}

        {data?.products_connection?.nodes?.length === 0 && (
          <p className="px-4 py-3 text-sm text-gray-500">
            No products found
          </p>
        )}

        {data?.products_connection?.nodes?.map((item) => (
          <Link key={item.documentId} to={`/product/${item.documentId}`}>
            <div className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-sm">
              {item.name}
            </div>
          </Link>
        ))}
      </div>
    )}
  </div>
);

}

export default Search;
