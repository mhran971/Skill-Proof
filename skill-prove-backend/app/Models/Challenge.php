<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Challenge extends Model
{
    protected $fillable = [
        'title','description','difficulty','skills_required',
        'deadline','xp_reward','instructions','company_id','status',
    ];
    protected $casts = [
        'skills_required'=>'array','deadline'=>'date','xp_reward'=>'integer',
    ];

    public function company()     { return $this->belongsTo(User::class, 'company_id'); }
    public function submissions() { return $this->hasMany(Submission::class); }
}
