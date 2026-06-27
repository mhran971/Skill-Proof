<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class SubmissionLink extends Model
{
    protected $fillable = ['submission_id','url','type'];
    public function submission() { return $this->belongsTo(Submission::class); }
}