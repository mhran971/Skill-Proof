<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Submission extends Model
{
    protected $fillable = ['user_id','challenge_id','notes','status'];

    public function candidate()  { return $this->belongsTo(User::class, 'user_id'); }
    public function challenge()  { return $this->belongsTo(Challenge::class); }
    public function links()      { return $this->hasMany(SubmissionLink::class); }
    public function scores()     { return $this->hasMany(SubmissionScore::class); }
}
