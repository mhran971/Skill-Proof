<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name', 'email', 'password', 'role',
        'avatar', 'location', 'title',
        'profile_completion', 'reputation', 'readiness',
        'badge_tier',   // ← جديد
        'is_suspended',
    ];

    protected $hidden = ['password', 'remember_token'];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password'          => 'hashed',
        'is_suspended'      => 'boolean',
    ];

    // ─── Profile ────────────────────────────────────────────
    public function candidateProfile()
    {
        return $this->hasOne(CandidateProfile::class);
    }

    public function companyProfile()
    {
        return $this->hasOne(CompanyProfile::class);
    }

    // ─── Skills ─────────────────────────────────────────────
    public function userSkills()
    {
        return $this->hasMany(UserSkill::class);
    }

    public function skills()
    {
        return $this->belongsToMany(Skill::class, 'user_skills')
                    ->withPivot('level', 'score')->withTimestamps();
    }

    // ─── Profile sections (جديد) ────────────────────────────
    public function educations()
    {
        return $this->hasMany(Education::class)->orderBy('sort_order');
    }

    public function certifications()
    {
        return $this->hasMany(Certification::class)->orderByDesc('year');
    }

    public function portfolioItems()
    {
        return $this->hasMany(PortfolioItem::class)->orderBy('sort_order');
    }

    // ─── Challenges & Submissions ───────────────────────────
    public function challenges()
    {
        return $this->hasMany(Challenge::class, 'company_id');
    }

    public function submissions()
    {
        return $this->hasMany(Submission::class);
    }

    public function reviewedSubmissions()
    {
        return $this->hasMany(Submission::class, 'reviewer_id');
    }

    // ─── Jobs ───────────────────────────────────────────────
    public function companyJobs()
    {
        return $this->hasMany(CompanyJob::class, 'company_id');
    }

    public function jobApplications()   // candidate → job
    {
        return $this->hasMany(CandidateJobApplication::class);
    }

    // ─── Internships & Tasks ────────────────────────────────
    public function internships()
    {
        return $this->belongsToMany(Internship::class, 'user_internships')
                    ->withPivot('progress')->withTimestamps();
    }

    public function taskAssignments()
    {
        return $this->hasMany(TaskAssignment::class);
    }

    // ─── Other ──────────────────────────────────────────────
    public function videos()
    {
        return $this->hasMany(Video::class);
    }

    public function activityLogs()
    {
        return $this->hasMany(ActivityLog::class)->latest();
    }

    public function interviewSessions()   // جديد
    {
        return $this->hasMany(InterviewSession::class)->latest();
    }

    // ─── Helpers ────────────────────────────────────────────
    public function isCandidate(): bool { return $this->role === 'candidate'; }
    public function isCompany(): bool   { return $this->role === 'company'; }
    public function isAdmin(): bool     { return $this->role === 'admin'; }
}
