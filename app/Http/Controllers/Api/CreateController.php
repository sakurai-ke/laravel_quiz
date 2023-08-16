<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Create;
use App\Models\Quiz;

class CreateController extends Controller
{
    public function createQuiz(Request $request)
    {
        // リクエストからクイズデータを取得
        $quizData = $request->all();

        // ログインしていることを確認
        if (auth()->check()) {
            // ログインユーザーのIDを取得
            $userId = auth()->id();

            // クイズモデルを使ってデータベースにクイズ情報を保存
            Quiz::create([
                'user_id' => $userId,
                'category_id' => $quizData['category_id'], // カテゴリーIDを含める
                'title' => $quizData['title'],
                'correct_answer' => $quizData['correct_answer'],
                'wrong_answer_1' => $quizData['wrong_answer_1'],
                'wrong_answer_2' => $quizData['wrong_answer_2'],
                'wrong_answer_3' => $quizData['wrong_answer_3'],
                'explain' => $quizData['explain'],
            ]);

            // 保存が成功したことを返すJSONレスポンスを返す
            return response()->json(['message' => 'クイズが作成されました'], 201);
        }

        // ログインしていない場合はエラーレスポンスを返す
        return response()->json(['message' => 'ログインしていません'], 401);
    }
    /**
     * Display a listing of the resource.
     */
public function getUserQuizzes()
{
    $userId = auth()->id();
    $quizzes = Quiz::where('user_id', $userId)->orderBy('created_at', 'desc')->get();
    return response()->json(['quizzes' => $quizzes]);
}

    public function index()
    {
        return Inertia::render('Create/List');
    }

    

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Inertia.jsを使用してCreate.vueコンポーネントを表示
        return Inertia::render('Create/Create');
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
    public function showUserQuizzes(string $id)
    {
        $quiz = Quiz::findOrFail($id); // クイズIDに対応するクイズを取得
    
        if (!$quiz) {
            abort(404); // クイズが存在しない場合は404エラーを返す
        }
    
        return response()->json(['quiz' => $quiz]);
    }

    public function show(string $id)
    {
        return Inertia::render('Create/Show');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // Edit.vueコンポーネントを表示
        return Inertia::render('Create/Edit', ['quizId' => $id]);
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
