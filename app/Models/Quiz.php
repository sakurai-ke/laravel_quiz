<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Answer;
use App\Models\Category;
use App\Models\User;

class Quiz extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'answer_id',
        'category_id',
        'image_src',
        'delete_flag',
        'user_id',
    ];

    public function answer()
    {
        return $this->hasOne(Answer::class, 'id', 'correct_answer_no');
    }

    // public function answer() {
    //     return $this->belongsTo(Answer::class);
    // }
        
    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
