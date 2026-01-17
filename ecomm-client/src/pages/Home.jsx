import { GET_ALL_PRODUCTS } from "../gqloperations/queries";
import { useQuery } from "@apollo/client/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "../components/pagination";

function Home() {
  const [page,setPage] = useState(1)
  const { loading, data, error,refetch } = useQuery(GET_ALL_PRODUCTS,{
    variables:{
       "pagination": {
    "page": page,
    "pageSize": 4
  }
    }
  });

  useEffect(()=>{
    if(page !==1)  refetch()
  },[page, refetch])
   
  const updatePage = (newPage)=>{
    setPage(newPage)
  }


  if (loading) return <h1 className="text-center mt-10">Loading....</h1>;
  if (error) return <h1 className="text-center mt-10">Something went wrong</h1>;
  
  const products = data.products_connection.nodes;
  const pageCount = data.products_connection.pageInfo.pageCount;
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item) => (
          <Link
            key={item.documentId}
            to={`/product/${item.documentId}`}
            className="block"
          >
            <div className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 flex flex-col cursor-pointer">
              {/* IMAGE */}
              <div className="h-48 bg-gray-100 rounded-t-xl overflow-hidden">
                {item.images?.[0] && (
                  <img
                    src={`http://localhost:1337${item.images[0].url}`}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>

              {/* CONTENT */}
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold mb-1 line-clamp-2">
                  {item.name}
                </h2>

                <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                  {item.description
                    ?.flatMap((block) =>
                      block.children?.map((child) => child.text)
                    )
                    .join(" ")}
                </p>

                <div className="mt-auto">
                  <p className="text-xl font-bold text-green-600 mb-3">
                    ₹{item.price}
                  </p>

                  <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
                    View Product
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Pagination pageCount={pageCount} page={page} updatePage={updatePage} />
    </div>
  );
}

export default Home;
