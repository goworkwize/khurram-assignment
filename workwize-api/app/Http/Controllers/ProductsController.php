<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\services\ProductService;

class ProductsController extends Controller
{
    public function __construct(private ProductService $productService) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // conditional return products
        return $this->productService->getAllProducts();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductRequest $request)
    {
        return $this->productService->createNewProduct($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return $this->productService->getProductById($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductRequest $request, string $id)
    {
        return $this->productService->updateProduct($request->validated(), $id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return $this->productService->deleteProduct($id);
    }

    public function getOwnProducts()
    {
        return $this->productService->getProductsByUser(auth()->id());
    }
}
