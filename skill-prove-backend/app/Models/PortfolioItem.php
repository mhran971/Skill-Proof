<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PortfolioItem extends Model
{
    protected $fillable = [
        'user_id', 'name', 'stack', 'url',
        'thumb_url', 'description', 'sort_order',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
