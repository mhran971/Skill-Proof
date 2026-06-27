<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class SubmissionScore extends Model
{
    protected $fillable = ['submission_id','score','feedback','scored_by'];
    protected $casts    = ['score'=>'integer'];

    public function submission() { return $this->belongsTo(Submission::class); }
    public function scorer()     { return $this->belongsTo(User::class, 'scored_by'); }
}