<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CandidateProfile extends Model
{
    protected $table = 'candidate_profiles';
    protected $fillable = [
        'user_id',
        'title',
        'location',
        'bio',
        'reputation',
        'readiness',
        'profile_completion',

    ];
    
}
