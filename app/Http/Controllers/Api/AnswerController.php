<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Answer;
use App\Models\Quiz;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnswerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $answers = Answer::all();
        return inertia('Answers/Index', ['answers' => $answers]);  
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Answers/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // フォームからの入力を受けてAnswerテーブルに新しいデータを追加
        Answer::create($request->all());
        return redirect()->route('answers.index');
    }

    // 選択肢と正解情報を返す
    public function fetchChoicesAndCorrectAnswer($quizId)
    {
        try {
            $quiz = Quiz::with('answer')->find($quizId);
            if (!$quiz) {
                return response()->json(['error' => 'クイズが見つかりません'], 404);
            }
    
            return response()->json([
                'quiz' => $quiz, // クイズ情報と関連する選択肢情報を返す
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => '選択肢と正解情報の取得に失敗しました'], 500);
        }
    }
    

    // public function getQuizById($quizId)
    // {
    //     try {
    //         $quiz = Quiz::find($quizId);
    //         if (!$quiz) {
    //             return response()->json(['error' => 'クイズが見つかりません'], 404);
    //         }

    //         // クイズ情報を選択肢と一緒に返す
    //         return response()->json([
    //             'quiz' => $quiz, // クイズ情報
    //             'choices' => $quiz->choices // 選択肢情報
    //         ]);
    //     } catch (\Exception $e) {
    //         return response()->json(['error' => 'クイズ情報の取得に失敗しました'], 500);
    //     }
    // }

    
    
    
    
    
    
    
    


    /**
     * Display the specified resource.
     */
    public function show(Answer $answer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Answer $answer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Answer $answer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Answer $answer)
    {
        //
    }
}
