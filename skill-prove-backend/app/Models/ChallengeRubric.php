<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChallengeRubric extends Model
{
    protected $fillable = [
        'challenge_id', 'rubric_key', 'weight', 'sort_order',
    ];

    public function challenge()
    {
        return $this->belongsTo(Challenge::class);
    }
}
