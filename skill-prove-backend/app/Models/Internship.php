<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Internship extends Model
{
    protected $fillable = [
        'title','description','duration_weeks','is_paid','stipend',
        'skills_required','deadline','location','company_id','status',
    ];
    protected $casts = [
        'skills_required'=>'array','is_paid'=>'boolean',
        'stipend'=>'float','deadline'=>'date',
    ];
    public function company() { return $this->belongsTo(User::class, 'company_id'); }
}