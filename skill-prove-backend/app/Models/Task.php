<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'user_id','title','description','due_date','priority','type','is_completed','completed_at',
    ];
    protected $casts = [
        'is_completed'=>'boolean','due_date'=>'date','completed_at'=>'datetime',
    ];
    public function user() { return $this->belongsTo(User::class); }
}