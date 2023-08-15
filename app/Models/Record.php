<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Record extends Model
{
    protected $fillable = [
        'user_id',
        'quiz_id',
        'category_id',
        'total_questions',
        'correct_answers',
        'accuracy',
        'selected_choice',
        'correct',
    ];
}
