<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CandidateJobApplication extends Model
{
    protected $fillable = [
        'user_id', 'job_id', 'status', 'cover_note', 'applied_at',
    ];

    protected $casts = [
        'applied_at' => 'datetime',
    ];

    public function candidate()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function job()
    {
        return $this->belongsTo(CompanyJob::class, 'job_id');
    }
}
