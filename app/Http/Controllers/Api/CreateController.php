<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\CreateQuizRequest;
use App\Http\Requests\UpdateQuizRequest;
use Inertia\Inertia;
use App\Models\Create;
use App\Models\Quiz;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;

class CreateController extends Controller
{
    public function createQuiz(CreateQuizRequest $request)
    {
        // リクエストからクイズデータを取得
        $quizData = $request->all();


    // もし画像データがアップロードされている場合
    if ($request->hasFile('image_src')) {
        // アップロードされた画像の元々のファイル名を取得
        $original = $request->file('image_src')->getClientOriginalName();
        // 現在の日付と時刻を基にして一意のファイル名を生成
        $name = date('Ymd_His') . '_' . $original;
        // 生成した新しいファイル名でpublicディレクトリのimagesサブディレクトリにファイルを保存
        $request->file('image_src')->storeAs('public/images', $name);
        // 画像のファイル名をクイズデータに追加
        $quizData['image_src'] = $name;
    }

        // ログインしていることを確認
        if (auth()->check()) {
            // ログインユーザーのIDを取得
            $userId = auth()->id();

            // クイズモデルを使ってデータベースにクイズ情報を保存
            Quiz::create([
                'user_id' => $userId,
                'category_id' => $quizData['category_id'],
                'title' => $quizData['title'],
                'correct_answer' => $quizData['correct_answer'],
                'wrong_answer_1' => $quizData['wrong_answer_1'],
                'wrong_answer_2' => $quizData['wrong_answer_2'],
                'wrong_answer_3' => $quizData['wrong_answer_3'],
                'explain' => $quizData['explain'],
                'image_src' => $quizData['image_src'],
            ]);

// クイズ作成が成功したことをセッションに保存
// session()->flash('quiz_created', true);

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
        $quizzes = Quiz::with('category') // カテゴリー情報を取得
                    ->where('user_id', $userId)
                    ->orderBy('created_at', 'desc')
                    ->get();
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
     * Display the specified resource.
     */
    public function showUserQuizzes(string $id)
    {
        $quiz = Quiz::with('category') // カテゴリー情報も一緒に読み込む
        ->findOrFail($id);
        
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
    public function editUserQuizzes(string $id)
    {
        try {
            $quiz = Quiz::findOrFail($id);
            return response()->json(['quiz' => $quiz]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'クイズの更新に失敗しました', 'validation_errors' => $e->getMessage()], 500);
        }
        
    }
    

    public function edit(string $id)
    {
        // Edit.vueコンポーネントを表示
        return Inertia::render('Create/Edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateUserQuizzes(UpdateQuizRequest $request, string $id)
    {
        try {
            $quiz = Quiz::findOrFail($id);
    
            // リクエストからクイズデータを取得
            $quizData = $request->all();
    
            // もし画像データがアップロードされている場合
            if ($request->hasFile('image_src')) {
                $original = $request->file('image_src')->getClientOriginalName();
                $name = date('Ymd_His') . '_' . $original;
    
                // 旧画像が存在する場合は削除
                if ($quiz->image_src) {
                    $imagePath = storage_path('app/public/images/') . $quiz->image_src;
                    if (file_exists($imagePath)) {
                        Storage::delete('public/images/' . $quiz->image_src);
                    }
                }
    
                // 新しいファイル名で画像を保存
                $request->file('image_src')->storeAs('public/images', $name);
                $quizData['image_src'] = $name;
            }
    
            // クイズ情報を更新
            $quiz->update($quizData);

            // 更新が成功したことを返すJSONレスポンスを返す
            return response()->json(['message' => 'クイズが更新されました'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'クイズの更新に失敗しました'], 500);
        }
    }
    
    public function flashMessage(Request $request)
{
    $flashMessage = $request->session()->get('flashMessage');
    return response()->json(['flashMessage' => $flashMessage]);
}

public function uploadImage(Request $request)
    {
        try {
            if ($request->hasFile('image_src')) {
                $file = $request->file('image_src');
                $originalName = $file->getClientOriginalName();
                $newFileName = date('Ymd_His') . '_' . $originalName;
                
                // ファイルをpublicディスクのimagesディレクトリに保存
                $file->storeAs('public/images', $newFileName);
                
                return response()->json(['image_src' => $newFileName]);
            } else {
                return response()->json(['error' => '画像ファイルがアップロードされていません'], 400);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => '画像のアップロードに失敗しました'], 500);
        }
    }

public function deleteImage(string $id)
    {
        try {
            $quiz = Quiz::findOrFail($id);

            if ($quiz->image_src) {
                // 画像が存在する場合は削除
                $imagePath = storage_path('app/public/images/') . $quiz->image_src;
                if (file_exists($imagePath)) {
                    Storage::delete('public/images/' . $quiz->image_src);
                }

                // クイズ情報の画像ファイル名を削除
                $quiz->update(['image_src' => null]);

                return response()->json(['message' => '画像ファイルを削除しました']);
            }

            return response()->json(['message' => '画像ファイルが見つかりませんでした'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => '画像ファイルの削除に失敗しました'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $quiz = Quiz::find($id);
        if ($quiz) {
            if ($quiz->image_src) {
                // 画像が存在する場合は削除
                $imagePath = public_path('storage/images/') . $quiz->image_src;
                if (file_exists($imagePath)) {
                    unlink($imagePath);
                }
            }
            $quiz->delete();
            return response()->json(['message' => 'クイズが削除されました']);
        }
    
        return response()->json(['message' => 'クイズが見つかりませんでした'], 404);
    }
    
    // クイズ情報削除用
    public function quizDestroy(string $id)
    {
        $quiz = Quiz::find($id);

        if ($quiz) {
            if ($quiz->image_src) {
                // 画像が存在する場合は削除
                $imagePath = public_path('storage/images/') . $quiz->image_src;
                if (file_exists($imagePath)) {
                    unlink($imagePath);
                }
            }

            $quiz->delete();
            return response()->json(['message' => 'クイズが削除されました']);
        }

        return response()->json(['message' => 'クイズが見つかりませんでした'], 404);
    }

    public function quizzesDestroy(Request $request)
    {
        $quizIds = $request->input('quiz_ids');

        // クイズを削除する処理を実行
        Quiz::whereIn('id', $quizIds)->delete();

        return response()->json(['message' => 'クイズが削除されました'], 200);
    }

    public function getAllQuizzes()
    {
        if (Auth::user()->role->name === 'admin') {
            // 管理者の場合、すべてのクイズ情報を取得
            $quizzes = Quiz::with('category')
                        ->orderBy('created_at', 'desc')
                        ->get();
            return response()->json(['quizzes' => $quizzes]);
        }
    
        // 管理者でない場合はエラーレスポンスを返す
        return response()->json(['message' => '管理者権限が必要です'], 403);
    }

    public function getUserRole()
    {
        $user = Auth::user(); // 現在の認証ユーザーを取得
    
        if ($user) {
            // ユーザーがログインしており、役割情報が存在する場合
            $role = optional($user->role)->name; // ユーザーの役割名を取得 (null の場合も考慮)
            return response()->json(['role' => $role]);
        } else {
            // 認証されていない場合、エラーレスポンスを返す
            return response()->json(['message' => '認証されていません'], 401);
        }
    }
    
}
