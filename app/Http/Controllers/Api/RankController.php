<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

use App\Models\Record;
use Illuminate\Support\Facades\DB;

class RankController extends Controller
{
    public function getUserRanking(Request $request)
    {
        $categoryId = $request->input('category');
        $fromDate = $request->input('fromDate'); // 追加
        $toDate = $request->input('toDate'); // 追加
    
        // usersテーブルのidカラムとrecordsテーブルのuser_idカラムが一致する場合に結合
        $query = User::leftJoin('records', 'users.id', '=', 'records.user_id')
        // categoriesテーブルのid ラムとrecordsテーブルのcategory_id ラムが一致する場合に結合
            ->leftJoin('categories', 'categories.id', '=', 'records.category_id')
            // カテゴリーIDが指定されている場合のみ、そのカテゴリー関連の結果を取得
            ->when($categoryId, function ($query, $categoryId) {
                return $query->where('categories.id', $categoryId);
            });
    
        // 日付範囲が指定された場合、クエリに追加
        if ($fromDate && $toDate) {
            $query->whereBetween('records.created_at', [$fromDate, $toDate]);
        }
    
        // 指定された日付範囲内のクイズ結果のみを取得するための条件をクエリに追加。
        // 開始日と終了日が指定されていない場合、この条件は追加されず、日付範囲の制約は無視
        $rankingData = $query->select(
            'users.name as user_name',
            DB::raw('SUM(records.correct_answers) as total_correct_answers'),
            DB::raw('SUM(records.total_questions) as total_questions')
        )
        ->groupBy('user_name')
        ->orderByDesc('total_correct_answers')
        ->get();
    
        // 各ユーザーの正答率を計算し、新しいフォーマットで格納する
        $formattedData = $rankingData->map(function ($entry) {
            $accuracy = $entry->total_questions > 0 ? ($entry->total_correct_answers / $entry->total_questions) * 100 : 0;
            return [
                'user' => [
                    'name' => $entry->user_name,
                ],
                'accuracy' => $accuracy,
            ];
        });
    
        return response()->json($formattedData);
    }
    

    public function index(Request $request)
    {
        // ユーザーごとのクイズ結果を取得
        $userId = auth()->user()->id; // ログインユーザーのIDを取得
        $quizResults = Record::with(['category', 'results', 'results.quiz'])
            ->where('user_id', $userId) // ログインユーザーのクイズ結果のみ取得
            ->select('id', 'category_id', 'correct_answers', 'total_questions', 'accuracy', 'created_at')
            ->get();
    
        return Inertia::render('Rank/Rank', ['quizResults' => $quizResults]);
    }
}