<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $fillable = [
        'guest_token',
    ];

    public function items(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }
}
