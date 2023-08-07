<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Quiz;
use App\Models\Category;

class Answer extends Model
{
    use HasFactory;

    protected $fillable = [
        'answer_1',
        'answer_2',
        'answer_3',
        'answer_4',
        'correct_answer_no',
        'explain',
        'hint',
        'category_id',    
 ];

 public function quiz()
    {
    return $this->belongsTo(Quiz::class); 
    }

    // public function quiz() {
    //     return $this->belongsTo(Quiz::class);
    //         }

    public function category(){
        return $this->belongsTo(Category::class); // Answerテーブルのcategory_idとCategoryテーブルのidの関連
    }
}
