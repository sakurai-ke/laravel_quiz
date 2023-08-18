<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateQuizRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // falseだとうまく表示されないのでtrueとする
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
                // 'user_id' => ['required', 'max:50'],
                'category_id' => ['required'],
                'title' => ['required', 'max:500'],
                'correct_answer' => ['required', 'max:50'],
                'wrong_answer_1' => ['required', 'max:50'],
                'wrong_answer_2' => ['required', 'max:50'],
                'wrong_answer_3' => ['required', 'max:50'],
                'explain' => ['required', 'max:1000'],
                'image_src' => ['max:2048']
                ];
    }
}
