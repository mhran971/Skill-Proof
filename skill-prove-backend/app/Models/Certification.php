<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Certification extends Model
{
    protected $fillable = [
        'user_id', 'name', 'issuer', 'year', 'credential_url',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
