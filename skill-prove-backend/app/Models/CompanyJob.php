<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompanyJob extends Model
{
    protected $table = 'company_jobs';
    protected $fillable = [
        'company_id', 'title',
        'description',      // ← جديد
        'type',             // ← جديد  (full-time | part-time | remote | hybrid)
        'location',
        'salary_min', 'salary_max',
        'skills_required',  // ← جديد (json)
        'deadline',         // ← جديد
        'status', 'applicants_count',
    ];

    protected $casts = [
        'skills_required'  => 'array',  // ← جديد
        'deadline'         => 'date',   // ← جديد
        'applicants_count' => 'integer',
    ];

    public function company()
    {
        return $this->belongsTo(User::class, 'company_id');
    }

    // ← جديد
    public function candidateApplications()
    {
        return $this->hasMany(CandidateJobApplication::class, 'job_id');
    }

    // Helper: "14-20k"
    public function salaryRange(): ?string
    {
        if ($this->salary_min && $this->salary_max) {
            return "{$this->salary_min}-{$this->salary_max}k";
        }
        return null;
    }

    public function applications()
{
    return $this->hasMany(CandidateJobApplication::class, 'job_id');
}
}
