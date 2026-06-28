<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CandidateProfile extends Model
{
    protected $table = 'candidate_profiles';
    protected $fillable = ['bio', 'skills', 'github_url', 'linkedin_url', 'portfolio_url', 'avatar_url'];
}
