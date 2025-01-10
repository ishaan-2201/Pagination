import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
      );
      setProducts(data.products);
      setTotalPages(Math.floor(data.total / 10));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const selectPageHandler = (pageIdx) => {
    if (pageIdx >= 1 && pageIdx <= totalPages) setPage(pageIdx);
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen text-2xl font-semibold text-gray-700">
        Loading products...
      </div>
    );
  }

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Our Products
      </h1>

      {/* Product Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition duration-300"
          >
            {/* Product Image */}
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />

            {/* Product Title and Description */}
            <h2 className="text-2xl font-semibold text-gray-900">
              {product.title}
            </h2>
            <p className="text-gray-600 mt-2 text-sm line-clamp-3">
              {product.description}
            </p>

            {/* Product Price and Rating */}
            <div className="flex justify-between items-center mt-4">
              <p className="text-lg font-bold text-green-600">
                ${product.price}
              </p>
              <p className="text-yellow-500 font-semibold">
                ⭐ {product.rating}
              </p>
            </div>

            {/* Product Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {product.tags &&
                product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs font-semibold bg-gray-200 text-gray-700 px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
            </div>

            {/* Purchase Button */}
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold mt-6 transition duration-300">
              Buy Now
            </button>
          </div>
        ))}
      </div>
      {products.length > 0 && (
        <div className="p-[10px] my-[15px] flex justify-center">
          {page > 1 && (
            <span
              className="pagination-child"
              onClick={() => selectPageHandler(page - 1)}
            >
              ⬅️
            </span>
          )}
          {[...Array(totalPages)].map((_, idx) => (
            <span
              key={idx}
              className={`pagination-child ${
                idx + 1 === page ? `active` : null
              }`}
              onClick={() => selectPageHandler(idx + 1)}
            >
              {idx + 1}
            </span>
          ))}
          {page < totalPages && (
            <span
              className="pagination-child"
              onClick={() => selectPageHandler(page + 1)}
            >
              ➡️
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
