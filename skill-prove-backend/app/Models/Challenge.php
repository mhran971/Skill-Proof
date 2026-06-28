<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Challenge extends Model
{
    protected $fillable = [
        'company_id',
        'title_ar', 'title_en',
        'description_ar', 'description_en',
        'category', 'difficulty', 'duration',
        'reward',
        'skills_required',  // ← جديد (json)
        'status',
    ];

    protected $casts = [
        'skills_required' => 'array',  // ← جديد
        'reward'          => 'integer',
    ];

    public function company()
    {
        return $this->belongsTo(User::class, 'company_id');
    }

    public function submissions()
    {
        return $this->hasMany(Submission::class);
    }

    // ← جديد
    public function rubrics()
    {
        return $this->hasMany(ChallengeRubric::class)->orderBy('sort_order');
    }
}
