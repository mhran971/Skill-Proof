<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Submission extends Model
{
    protected $fillable = [
        'user_id', 'challenge_id', 'reviewer_id',
        'type', 'status',
        'feedback_ar', 'feedback_en',
        'ai_score',           // ← جديد
        'ai_feedback_ar',     // ← جديد
        'ai_feedback_en',     // ← جديد
        'ai_evaluated_at',    // ← جديد
        'accepted_to_showcase',
        'submitted_at',
    ];

    protected $casts = [
        'accepted_to_showcase' => 'boolean',
        'submitted_at'         => 'datetime',
        'ai_evaluated_at'      => 'datetime',  // ← جديد
        'ai_score'             => 'decimal:1', // ← جديد
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function challenge()
    {
        return $this->belongsTo(Challenge::class);
    }

    public function reviewer()
    {
        return $this->belongsTo(User::class, 'reviewer_id');
    }

    public function links()
    {
        return $this->hasMany(SubmissionLink::class);
    }

    public function scores()
    {
        return $this->hasMany(SubmissionScore::class);
    }

    // ← جديد
    public function rubricScores()
    {
        return $this->hasMany(SubmissionRubricScore::class);
    }

    // متوسط درجات الـ rubric
    public function avgRubricScore(): float
    {
        $s = $this->rubricScores->pluck('score');
        return $s->count() ? round((float) $s->avg(), 1) : 0.0;
    }
}
