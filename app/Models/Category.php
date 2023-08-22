<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Quiz;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function quizzes() {
        return $this->hasMany(Quiz::class);
            }

    public function records() {
        return $this->hasMany(Record::class);
            }            
}
