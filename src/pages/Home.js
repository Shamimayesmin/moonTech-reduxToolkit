import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { toggle, toggleBrands } from "../features/filter/filterSlice";
import { getProducts } from "../features/products/productsSlice";

const Home = () => {
	// const [products, setProducts] = useState([]);

	const dispatch = useDispatch();

	const filter = useSelector((state) => state.filter);
	const { brands, stock } = filter;
	const { products, isLoading } = useSelector((state) => state.products);
	const activeClass = "text-white  bg-indigo-500 border-white";

	useEffect(() => {
		// fetch("http://localhost:5000/products")
		// 	.then((res) => res.json())
		// 	.then((data) => setProducts(data.data));

		dispatch(getProducts());
	}, [dispatch]);
	// console.log(products);

	let content;

	if (isLoading) {
		content = <h1>Loading ...</h1>;
	}

	if (products.length) {
		content = products.map((product) => (
			<ProductCard key={product.model} product={product} />
		));
	}

	if (products.length && (filter.stock || filter.brands.length)) {
		content = products
			.filter((product) => {
				if (stock) {
					return product.status === true;
				}
				return product;
			})
			.filter((product) => {
				if (filter.brands.length) {
					return filter.brands.includes(product.brand);
				}
				return product;
			})
			.map((product) => <ProductCard key={product.model} product={product} />);
	}

	return (
		<div>
			<div className="justify-center items-center flex gap-3">
				<button
					className={`border px-3 py-2 rounded-full font-semibold ${
						stock ? activeClass : null
					} `}
					onClick={() => dispatch(toggle())}
				>
					In stock
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

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl gap-14 mx-auto my-10">
				{/* {products?.map((product) => (
					<ProductCard key={product._id} product={product} />
				))} */}
				{content}
			</div>
		</div>
	);
};

export default Home;
