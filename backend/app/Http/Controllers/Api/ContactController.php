<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:150'],
            'subject' => ['required', 'string', 'max:150'],
            'message' => ['required', 'string', 'min:3', 'max:2000'],
        ]);

        $message = ContactMessage::query()->create($validated);

        return response()->json([
            'data' => $message,
            'message' => 'Thanks for contacting us. We will reach out soon.',
        ], 201);
    }
}
