<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
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
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        // Quiz.vueからのリクエストに含まれるデータを取得
        $quizList = json_decode($request->getContent(), true);
    
        // $quizListがnullの場合や配列でない場合のデフォルト値を設定
        if (!is_array($quizList)) {
            $quizList = [];
        }
    
        // ここで必要なデータを計算してビューに渡す
        $totalQuestions = count($quizList);
        $correctAnswers = 0;
    
        // クイズリストの各クイズごとに正答かどうかを判定
        foreach ($quizList as $quiz) {
            if ($quiz['selectedChoice'] === $quiz['correct_answer']) {
                $correctAnswers++;
            }
        }
    
        // 正答率を計算
        if ($totalQuestions > 0) {
            $correctPercentage = ($correctAnswers / $totalQuestions) * 100;
        } else {
            $correctPercentage = 0; // クイズが存在しない場合は正答率をゼロに設定
        }
    
        // 正答率に基づいてメッセージを作成
        $resultMessage = "正答率: " . number_format($correctPercentage, 2) . "%";

        // ビューにデータを渡す
        return inertia('Result', [
            'resultMessage' => $resultMessage,
            'correctPercentage' => $correctPercentage, // 正答率の数値も渡す
        ]);
    }
    
    
    
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
