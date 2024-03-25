<?php

namespace App\services;

use App\Models\Product;
use Illuminate\Http\JsonResponse;

class ProductService
{
    public function getAllProducts(): JsonResponse
    {
        $products = Product::query()->get();
        return response()->json(['products' => $products]);
    }

    public function createNewProduct($validatedProductData): JsonResponse
    {
        $validatedProductData = $this->addUserDetailsToValidatedData($validatedProductData);
        $product = Product::query()->create($validatedProductData);
        return response()->json(['product' => $product], 201);
    }

    public function getProductById($productId): JsonResponse
    {
        $product = Product::query()->findOrFail($productId);
        return response()->json(['product' => $product]);
    }

    public function updateProduct($validatedProductData, $productId): JsonResponse
    {
        $validatedProductData = $this->addUserDetailsToValidatedData($validatedProductData);
        $product = Product::query()->findOrFail($productId);
        $product->update($validatedProductData);
        return response()->json(['message' => 'Product updated successfully']);
    }

    public function deleteProduct($productId): JsonResponse
    {
        $product = Product::query()->findOrFail($productId);
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }

    public function addUserDetailsToValidatedData($validatedProductData): array
    {
        $validatedProductData['user_id'] = auth()->id();
        return $validatedProductData;
    }

    public function getProductsByUser($authId): JsonResponse
    {
        $products = Product::query()->where('user_id', $authId)->get();
        return response()->json(['products' => $products]);
    }
}
