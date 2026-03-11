<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Payment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PaymentController extends Controller
{
    public function checkout(Request $request, string $guestToken): JsonResponse
    {
        $validated = $request->validate([
            'payment_method' => ['required', 'in:upi,card,cod'],
            'upi_id' => ['nullable', 'string', 'max:100'],
            'card_last4' => ['nullable', 'string', 'size:4'],
        ]);

        $cart = Cart::query()
            ->where('guest_token', $guestToken)
            ->with('items.product')
            ->first();

        if (! $cart || $cart->items->isEmpty()) {
            return response()->json([
                'message' => 'Cart is empty. Add products before checkout.',
            ], 422);
        }

        $amount = $cart->items->sum(function ($item): float {
            $price = (float) $item->product->price;
            $discount = (int) $item->product->discount_percent;
            $finalPrice = $price - (($price * $discount) / 100);
            return $finalPrice * (int) $item->quantity;
        });

        $payment = Payment::query()->create([
            'guest_token' => $guestToken,
            'payment_method' => $validated['payment_method'],
            'amount' => round($amount, 2),
            'status' => 'success',
            'transaction_ref' => strtoupper(Str::random(12)),
            'meta' => [
                'items_count' => $cart->items->count(),
                'upi_id' => $validated['upi_id'] ?? null,
                'card_last4' => $validated['card_last4'] ?? null,
            ],
        ]);

        $cart->items()->delete();

        return response()->json([
            'message' => 'Dummy payment successful. Order placed.',
            'data' => $payment,
        ]);
    }
}
