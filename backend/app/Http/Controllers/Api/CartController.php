<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function show(string $guestToken): JsonResponse
    {
        $cart = $this->resolveCart($guestToken);

        return response()->json([
            'data' => $cart->load('items.product.category'),
        ]);
    }

    public function addItem(Request $request, string $guestToken): JsonResponse
    {
        $validated = $request->validate([
            'product_id' => ['required', 'exists:products,id'],
            'quantity' => ['nullable', 'integer', 'min:1', 'max:10'],
        ]);

        $quantity = $validated['quantity'] ?? 1;
        $cart = $this->resolveCart($guestToken);

        $item = CartItem::query()->firstOrNew([
            'cart_id' => $cart->id,
            'product_id' => $validated['product_id'],
        ]);
        $item->quantity = min(10, (int) $item->quantity + $quantity);
        $item->save();

        return response()->json([
            'data' => $cart->fresh()->load('items.product.category'),
            'message' => 'Item added to cart.',
        ]);
    }

    public function updateItem(Request $request, string $guestToken, int $itemId): JsonResponse
    {
        $validated = $request->validate([
            'quantity' => ['required', 'integer', 'min:1', 'max:10'],
        ]);

        $cart = $this->resolveCart($guestToken);
        $item = $cart->items()->where('id', $itemId)->firstOrFail();
        $item->update(['quantity' => $validated['quantity']]);

        return response()->json([
            'data' => $cart->fresh()->load('items.product.category'),
            'message' => 'Cart item updated.',
        ]);
    }

    public function removeItem(string $guestToken, int $itemId): JsonResponse
    {
        $cart = $this->resolveCart($guestToken);
        $cart->items()->where('id', $itemId)->delete();

        return response()->json([
            'data' => $cart->fresh()->load('items.product.category'),
            'message' => 'Cart item removed.',
        ]);
    }

    private function resolveCart(string $guestToken): Cart
    {
        return Cart::query()->firstOrCreate(['guest_token' => $guestToken]);
    }
}
