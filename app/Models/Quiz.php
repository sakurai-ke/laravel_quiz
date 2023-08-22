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
        'category_id',
        'user_id',
        'title',
        'correct_answer',
        'wrong_answer_1',
        'wrong_answer_2',
        'wrong_answer_3',
        'correct_answer_no',
        'explain',
        'hint',
        'image_src',
        'delete_flag',
    ];

        
    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function result() {
        return $this->belongsTo(Result::class);
    }
}
