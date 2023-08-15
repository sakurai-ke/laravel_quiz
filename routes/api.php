<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\QuizController;
use App\Http\Controllers\Api\RecordController;
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