<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\QuizController;
use App\Http\Controllers\Api\RecordController;
use App\Http\Controllers\Api\CreateController;
use App\Http\Controllers\Api\RankController;
use App\Http\Controllers\Api\ChatGptController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// ヒント取得のための記述
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/get-hint', [ChatGptController::class, 'getHint']);
});

// ランキング表示用
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/ranking', [RankController::class, 'getUserRanking']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/quiz-results', [RecordController::class, 'showRecord']); // クイズ結果情報を取得するエンドポイント
});

// RecordのAPIルート
Route::post('/record', [RecordController::class, 'storeRecord']); // POSTリクエストを受けてデータを保存

// ResultのAPIルート
Route::post('/result', [RecordController::class, 'storeResult']); // POSTリクエストを受けてデータを保存


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/makeQuizzes', [CreateController::class, 'createQuiz']); // クイズ作成APIエンドポイント
    Route::get('/getQuizzes', [CreateController::class, 'getUserQuizzes']); // クイズ一覧の取得
    Route::get('/showQuizzes/{id}', [CreateController::class, 'showUserQuizzes']); // クイズ詳細の取得
    Route::get('/editQuizzes/{id}', [CreateController::class, 'editUserQuizzes']); // 編集画面表示
    Route::put('/updateQuizzes/{id}', [CreateController::class, 'updateUserQuizzes']); // クイズ更新処理
    Route::post('/uploadImage', [CreateController::class, 'uploadImage']); // クイズ更新処理
    Route::delete('/deleteImage/{id}', [CreateController::class, 'deleteImage']); // 画像ファイル削除用
    Route::middleware('auth:sanctum')->delete('/quizzes/{id}', [CreateController::class, 'quizDestroy']); // 編集画面のクイズ情報削除用
    Route::middleware('auth:sanctum')->delete('/deleteQuizzes', [CreateController::class, 'quizzesDestroy']); // 編集画面のクイズ情報削除用
});


Route::post('/save-quiz-result', [RecordController::class, 'store']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// トップ画面でのカテゴリー情報を取得
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/categories', [CategoryController::class, 'category']);
});

// クイズ情報の取得
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/quizzes', [QuizController::class, 'getQuizzes']);
});

// Answerテーブルから選択肢と正解情報を取得
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/quizzes/{quizId}', [QuizController::class, 'fetchChoicesAndCorrectAnswer']);
    // Route::get('/quizzes/{quizId}', [AnswerController::class, 'getQuizById']); // この行を追加
});