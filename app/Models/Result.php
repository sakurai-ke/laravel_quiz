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

    public function result() {
        return $this->belongsTo(User::class);
    }

    public function quiz() {
        return $this->belongsTo(User::class);
    }
}
