<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Quiz;
use App\Models\Answer;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function quizzes() {
        return $this->hasMany(Quiz::class);
            }

    public function answers(){
        return $this->hasMany(Answer::class); // CategoryテーブルのidとAnswerテーブルのcategory_idの関連
    }
}
