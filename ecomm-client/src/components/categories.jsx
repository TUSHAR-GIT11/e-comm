import { GET_ALL_CATEGORIES } from "../gqloperations/queries";
import { useQuery } from "@apollo/client/react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Categories() {
  const { data, loading, error } = useQuery(GET_ALL_CATEGORIES);
  const [activeCategory, setActiveCategory] = useState(null);
  const location = useLocation()

    useEffect(()=>{
        if(location.pathname === "/"){
           setActiveCategory(null)
        }
    },[location.pathname])

  if (loading)
    return (
      <div className="bg-white py-3 text-center text-sm font-medium shadow">
        Loading categories...
      </div>
    );

  if (error)
    return (
      <div className="bg-white py-3 text-center text-red-500 font-medium shadow">
        Failed to load categories
      </div>
    );

  return (
    <div className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-center flex-wrap gap-6 py-4">
          {data.categories.map((item) => {
            const isActive = activeCategory === item.documentId;

            return (
              <Link
                key={item.documentId}
                to={`/category/${item.documentId}`}
                onClick={() => setActiveCategory(item.documentId)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition
                  ${
                    isActive
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-black hover:text-white"
                  }
                `}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Categories;
