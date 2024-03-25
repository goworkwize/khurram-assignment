import { useState, useEffect } from "react";
import axios from "axios";

const ListProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
          const token = localStorage.getItem('token');
          const apiUrl = 'http://workwize.test/api/my-products';
          const headers = token ? { Authorization: `Bearer ${token}` } : {};
          try {
            const response = await axios.get(apiUrl, {headers});
            console.log (response.data);
            setProducts(response.data.products); // data is directly accessible in Axios response
            console.log (response.data.products);
          } catch (error) {
            console.log('Error fetching data:', error);
          }
        };
      
        fetchProducts();
      }, []);

    return (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <h2 className="font-bold text-xl">All Products</h2>
                {products.map((product) => (
                <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm my-5">
                <dl className="-my-3 divide-y divide-gray-100 text-sm">
                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Name</dt>
                        <dd className="text-gray-700 sm:col-span-2">{ product.name }</dd>
                    </div>
                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Description</dt>
                        <dd className="text-gray-700 sm:col-span-2">{ product.description }</dd>
                    </div>
                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Price</dt>
                        <dd className="text-gray-700 sm:col-span-2">{ product.price }</dd>
                    </div>                     
                    </dl>
                    </div>

                ))}

        </div>     
    );
}

export default ListProducts;