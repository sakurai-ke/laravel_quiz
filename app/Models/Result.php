<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'category_id',
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
