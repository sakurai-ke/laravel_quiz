<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Record extends Model
{

    use HasFactory;

    protected $fillable = [
        'category_id',
        'user_id',
        'total_questions',
        'correct_answers',
        'accuracy',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
    
    public function category() {
        return $this->belongsTo(Category::class);
    }
    
    public function results() {
        return $this->hasMany(Result::class); // オプションでデフォルト値を指定
    }

}
