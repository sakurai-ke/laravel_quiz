<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Quiz;

class QuizController extends Controller
{

    // // 選択したカテゴリーと出題数をもとにクイズデータを一括で取得する
    public function getQuizzes(Request $request)
    {
        $categoryId = $request->input('category_id');
        $numQuestions = $request->input('num_questions');


        $quizzes = Quiz::select('id', 'category_id', 'user_id', 'title', 'image_src', 'delete_flag', 'correct_answer',
        'wrong_answer_1','wrong_answer_2','wrong_answer_3','hint','explain')
        ->where('category_id', $categoryId)
        ->limit($numQuestions)
        ->get();

        return response()->json($quizzes);
    }

        // 選択肢と正解情報を返す
        public function fetchChoicesAndCorrectAnswer($quizId)
        {
            try {
                $quiz = Quiz::find($quizId); // クイズデータを取得
        
                if (!$quiz) {
                    return response()->json(['error' => 'クイズが見つかりません'], 404);
                }
        
                return response()->json([
                    'quiz' => [
                        'id' => $quiz->id,
                        'title' => $quiz->title,
                        'image_src' => $quiz->image_src,
                        'choices' => [
                            'correct_answer' => $quiz->correct_answer,
                            'wrong_answer_1' => $quiz->wrong_answer_1,
                            'wrong_answer_2' => $quiz->wrong_answer_2,
                            'wrong_answer_3' => $quiz->wrong_answer_3,
                        ],
                    ],
                ]);
            } catch (\Exception $e) {
                \Log::error('Error fetching choices and correct answer: ' . $e->getMessage());
                return response()->json(['error' => '選択肢と正解情報の取得に失敗しました'], 500);
            }
        }
    
}
