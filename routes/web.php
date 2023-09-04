<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\QuizController;
use App\Http\Controllers\Api\RecordController;
use App\Http\Controllers\Api\CreateController; 
use App\Http\Controllers\Api\RankController; 

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// ランキング表示用
Route::get('/rank', [RankController::class, 'index'])
    ->name('rank')
    ->middleware(['auth', 'verified']);

// クイズ一覧画面、詳細画面、編集画面用
Route::middleware(['auth'])->group(function () {
    Route::get('/list', [CreateController::class, 'index'])->name('list');
    Route::get('/list/{id}', [CreateController::class, 'show'])->name('show');
    Route::get('/list/{id}/edit', [CreateController::class, 'edit'])->name('edit');
});

// クイズ作成ページの表示
Route::get('/create', [CreateController::class, 'create'])->name('create');
// クイズ作成フォームの送信処理
Route::post('/create', [CreateController::class, 'createQuiz']);

// 以下のルートを追加
Route::get('/records', [RecordController::class, 'index'])
    ->name('records')
    ->middleware(['auth', 'verified']);

Route::get('/quiz-results', [RecordController::class, 'paginate']);

// クイズの結果表示用ページ
Route::get('/result', [QuizController::class, 'show'])
    ->name('quiz.result')
    ->middleware(['auth', 'verified']);


Route::get('/top', [CategoryController::class, 'index'])->name('top');
// ->middleware(['auth', 'verified']);


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
