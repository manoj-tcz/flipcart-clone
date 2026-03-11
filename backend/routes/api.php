<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/health', fn () => response()->json(['status' => 'ok']));
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{slug}', [ProductController::class, 'show']);
Route::get('/dashboard', [DashboardController::class, 'index']);
Route::post('/contact', [ContactController::class, 'store']);

Route::get('/cart/{guestToken}', [CartController::class, 'show']);
Route::post('/cart/{guestToken}/items', [CartController::class, 'addItem']);
Route::patch('/cart/{guestToken}/items/{itemId}', [CartController::class, 'updateItem']);
Route::delete('/cart/{guestToken}/items/{itemId}', [CartController::class, 'removeItem']);
Route::post('/cart/{guestToken}/checkout', [PaymentController::class, 'checkout']);
