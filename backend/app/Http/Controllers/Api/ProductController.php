<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Product::query()->with('category');

        if ($request->filled('category')) {
            $query->whereHas('category', function ($builder) use ($request): void {
                $builder->where('slug', $request->string('category'));
            });
        }

        if ($request->boolean('featured')) {
            $query->where('is_featured', true);
        }

        $products = $query->latest()->get();

        return response()->json([
            'data' => $products,
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $product = Product::query()
            ->with('category')
            ->where('slug', $slug)
            ->firstOrFail();

        return response()->json([
            'data' => $product,
        ]);
    }
}
