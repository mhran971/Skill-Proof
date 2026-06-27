<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    protected $fillable = [
        'user_id','title','description','url','thumbnail','skills_showcased','duration',
    ];
    protected $casts = ['skills_showcased'=>'array','duration'=>'integer'];

    public function candidate() { return $this->belongsTo(User::class, 'user_id'); }
}