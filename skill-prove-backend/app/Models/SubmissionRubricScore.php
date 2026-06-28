<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubmissionRubricScore extends Model
{
    protected $fillable = [
        'submission_id', 'rubric_key', 'score', 'scored_by', 'is_ai',
    ];

    protected $casts = [
        'score' => 'decimal:1',
        'is_ai' => 'boolean',
    ];

    public function submission()
    {
        return $this->belongsTo(Submission::class);
    }

    public function scorer()
    {
        return $this->belongsTo(User::class, 'scored_by');
    }
}
