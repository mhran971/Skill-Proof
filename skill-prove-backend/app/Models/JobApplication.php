<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class JobApplication extends Model
{
    protected $fillable = ['user_id','job_id','cover_letter','status'];

    public function candidate() { return $this->belongsTo(User::class, 'user_id'); }
    public function job()       { return $this->belongsTo(CompanyJobs::class, 'job_id'); }
}