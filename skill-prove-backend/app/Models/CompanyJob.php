<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class CompanyJobs extends Model
{
    // إذا كان الجدول لا يزال jobs من قبل التسمية القديمة
    protected $table = 'company_jobs';

    protected $fillable = [
        'title','description','type','location',
        'salary_range','skills_required','deadline','company_id','status',
    ];
    protected $casts = [
        'skills_required'=>'array','deadline'=>'date',
    ];

    public function company()      { return $this->belongsTo(User::class, 'company_id'); }
    public function applications() { return $this->hasMany(JobApplication::class, 'job_id'); }
}