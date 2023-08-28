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
        $categoryId = $request->input('category'); // 特定のカテゴリーを示す値が取得
        $fromDate = $request->input('fromDate'); //クエリ範囲の開始日が取得
        $toDate = $request->input('toDate'); //クエリ範囲の終了日が取得
    
        // usersテーブルのidカラムとrecordsテーブルのuser_idカラムが一致する場合に結合
        $query = User::leftJoin('records', 'users.id', '=', 'records.user_id')
        // categoriesテーブルのid ラムとrecordsテーブルのcategory_id ラムが一致する場合に結合
            ->leftJoin('categories', 'categories.id', '=', 'records.category_id')
            // 特定のカテゴリーIDが与えられた場合、そのカテゴリー関連の結果を取得
            ->when($categoryId, function ($query, $categoryId) {
                // categoriesテーブルのidカラムが与えられたカテゴリーIDと一致するデータを絞り込む
                return $query->where('categories.id', $categoryId);
            })
            ->when($fromDate, function ($query, $fromDate) {
                return $query->whereDate('records.created_at', '>=', $fromDate);
            })
            ->when($toDate, function ($query, $toDate) {
                return $query->whereDate('records.created_at', '<=', $toDate);
            });

        // 日付範囲が指定された場合、クエリに追加
        if ($fromDate && $toDate) {
            // recordsテーブルのcreated_atカラムの値が、指定した開始日から終了日までの日付範囲内にあるデータを絞り込む
            $query->whereBetween('records.created_at', [$fromDate, $toDate]);
        }
    
        // 指定された日付範囲内のクイズ結果のみを取得するための条件をクエリに追加。
        // 開始日と終了日が指定されていない場合、この条件は追加されず、日付範囲の制約は無視
        $rankingData = $query->select(
            'users.name as user_name',
            // recordsテーブルのcorrect_answersカラムの合計値をtotal_correct_answersという別名とする
            DB::raw('SUM(records.correct_answers) as total_correct_answers'),
            // recordsテーブルのtotal_questionsカラムの合計値をtotal_questionという別名とする
            DB::raw('SUM(records.total_questions) as total_questions')
        )
        ->groupBy('user_name') // ユーザー名ごとにグループ化
        ->orderByDesc('total_correct_answers') //合計正答数が多い順に並び替え
        ->get();
    
        // 各ユーザーの正答率を計算し、新しいフォーマットで格納する
        $formattedData = $rankingData->map(function ($entry) {
            // 総問題数が0でない場合は正答率を計算。総問題数が0の場合、正答率を0とする
            $accuracy = $entry->total_questions > 0 ? ($entry->total_correct_answers / $entry->total_questions) * 100 : 0;
            return [
                // 各ユーザーの情報をuserというキーの下に連想配列として格納
                'user' => [
                    'name' => $entry->user_name, //nameというキーを持ち、その値として $entry->user_name を設定
                ],
                'accuracy' => $accuracy, //accuracyというキーの下に格納
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