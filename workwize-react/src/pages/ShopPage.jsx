import { useState, useEffect } from 'react';
import Product from '../Components/Product';
import axios from 'axios';
const shopPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
          const token = localStorage.getItem('token');
          const apiUrl = 'http://workwize.test/api/products';
          const headers = token ? { Authorization: `Bearer ${token}` } : {};
          try {
            const response = await axios.get(apiUrl, {headers});
            setProducts(response.data.products); // data is directly accessible in Axios response
            console.log (response.data.products);
          } catch (error) {
            console.log('Error fetching data:', error);
          }
        };
      
        fetchProducts();
      }, []);

    return (
        <section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <header className="text-center">
                <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Product Collection</h2>

                <p className="mx-auto mt-4 max-w-md text-gray-500">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque praesentium cumque iure
                    dicta incidunt est ipsam, officia dolor fugit natus?
                </p>
                </header>

                <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                    <Product key={product.id} product={product} />
                ))}
                </ul>
            </div>
        </section>
    );
}

export default shopPage;