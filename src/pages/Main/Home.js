import React from "react";
import ProductCard from "../../components/ProductCard";
import { toggle, toggleBrands } from "../../features/filter/filterSlice";
import { useGetProductsQuery } from "../../features/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  /*   const [products, setProducts] = useState([]) */ /* useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.data));
  }, []); */

  const { data, isError, isLoading, isSuccess, error } = useGetProductsQuery();
  const products = data?.data;
  const { brands, stock } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const activeClass = "text-white  bg-indigo-500 border-white";
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>`Something went wrong,${error}`</p>;
  }
  let content;

  if (products.length) {
    content = products.map((product) => (
      <ProductCard key={product.model} product={product} />
    ));
  }
  if (products.length && (stock || brands)) {
    content = products
      .filter((product) => {
        if (stock) {
          return product.status === true;
        }
        return product;
      })
      .filter((product) => {
        if (brands.length) {
          return brands.includes(product.brand);
        }
        return product;
      })
      .map((product) => <ProductCard key={product.model} product={product} />);

    return (
      <div className="max-w-7xl gap-14 mx-auto my-10">
        <div className="mb-10 flex justify-end gap-5">
          <button
            onClick={() => dispatch(toggle())}
            className={`border px-3 py-2 rounded-full font-semibold ${
              stock ? activeClass : null
            }  `}
          >
            In Stock
          </button>
          <button
            className={`border px-3 py-2 rounded-full font-semibold ${
              brands.includes("amd") ? activeClass : null
            }`}
            onClick={() => dispatch(toggleBrands("amd"))}
          >
            AMD
          </button>
          <button
            className={`border px-3 py-2 rounded-full font-semibold ${
              brands.includes("intel") ? activeClass : null
            }`}
            onClick={() => dispatch(toggleBrands("intel"))}
          >
            Intel
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
          {content}
        </div>
      </div>
    );
  }
};

export default Home;
