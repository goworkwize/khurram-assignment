<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\ProductsController;
use Illuminate\Support\Facades\Route;


Route::post('/login', LoginController::class);
Route::post('/register', RegisterController::class);

Route::middleware('auth:sanctum')->group(function() {
    Route::apiResource('products', ProductsController::class);
    Route::get('/my-products', [ProductsController::class, 'getOwnProducts']);
});

