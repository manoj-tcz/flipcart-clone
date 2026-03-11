<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\ContactMessage;
use App\Models\Product;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function index(): JsonResponse
    {
        $productsCount = Product::query()->count();
        $featuredCount = Product::query()->where('is_featured', true)->count();
        $lowStockCount = Product::query()->where('stock', '<=', 20)->count();
        $cartCount = Cart::query()->count();
        $contactCount = ContactMessage::query()->count();

        $latestContacts = ContactMessage::query()
            ->latest()
            ->limit(5)
            ->get(['id', 'name', 'email', 'subject', 'created_at']);

        return response()->json([
            'data' => [
                'summary' => [
                    'products_count' => $productsCount,
                    'featured_products_count' => $featuredCount,
                    'low_stock_products_count' => $lowStockCount,
                    'active_carts_count' => $cartCount,
                    'contact_messages_count' => $contactCount,
                ],
                'latest_contacts' => $latestContacts,
            ],
        ]);
    }
}
