<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    use HasFactory;

    protected $fillable = [
        'record_id',
        'quiz_id',
        'selected_choice',
        'correct',
    ];

    public function record() {
        return $this->belongsTo(Record::class);
    }

    public function quiz() {
        return $this->belongsTo(Quiz::class);
    }
}
