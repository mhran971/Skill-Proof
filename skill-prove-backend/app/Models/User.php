<?php
namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = ['name','email','password','role','is_suspended'];
    protected $hidden   = ['password','remember_token'];
    protected $casts    = [
        'email_verified_at' => 'datetime',
        'password'          => 'hashed',
        'is_suspended'      => 'boolean',
    ];

    public function candidateProfile() { return $this->hasOne(CandidateProfile::class); }
    public function companyProfile()   { return $this->hasOne(CompanyProfile::class); }
    public function submissions()      { return $this->hasMany(Submission::class); }
    public function challenges()       { return $this->hasMany(Challenge::class, 'company_id'); }
    public function jobs()             { return $this->hasMany(CompanyJobs::class, 'company_id'); }
    public function applications()     { return $this->hasMany(JobApplication::class); }
    public function videos()           { return $this->hasMany(Video::class); }
    public function tasks()            { return $this->hasMany(Task::class); }

    public function isAdmin()     { return $this->role === 'admin'; }
    public function isCompany()   { return $this->role === 'company'; }
    public function isCandidate() { return $this->role === 'candidate'; }
}