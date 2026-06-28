<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InterviewSession extends Model
{
    protected $fillable = [
        'user_id', 'questions', 'answers',
        'ai_feedback', 'overall_score',
        'status', 'completed_at',
    ];

    protected $casts = [
        'questions'     => 'array',
        'answers'       => 'array',
        'ai_feedback'   => 'array',
        'overall_score' => 'decimal:1',
        'completed_at'  => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
