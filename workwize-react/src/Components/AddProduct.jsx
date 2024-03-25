import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const createNewProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://workwize.test/api/products', 
                { name, description, price },
                {
                    headers: headers
                }
            );
            
            return navigate('/products');
          } catch (error) {
            console.log (error);
          }
    }

    return (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">Create New Product!</h1>

            <p className="mt-4 text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla eaque error neque
            ipsa culpa autem, at itaque nostrum!
            </p>
        </div>

        <form onSubmit={createNewProduct} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
            <div>
            <label htmlFor="email" className="sr-only">Email</label>

            <div className="relative">
                <input
                type="name"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
            </div>
            </div>

            <div>
            <label htmlFor="description" className="sr-only">Description</label>

            <div className="relative">
                <textarea
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            </div>

            <div>
            <label htmlFor="password" className="sr-only">Password</label>

            <div className="relative">
                <input
                type="number"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                />
            </div>
            </div>

            <div className="flex items-center justify-between">

            <button
                type="submit"
                className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            >
                Create Product
            </button>
            </div>
        </form>
        </div>
    );
}

export default AddProduct;