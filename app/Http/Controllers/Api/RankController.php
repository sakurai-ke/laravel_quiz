<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Record;
use Illuminate\Support\Facades\DB;

class RankController extends Controller
{
    public function getUserRanking()
    {
        // ユーザーごとのクイズ正答率ランキングを取得
        $rankingData = User::leftJoin('records', 'users.id', '=', 'records.user_id')
            ->select(
                'users.name as user_name',
                DB::raw('SUM(records.correct_answers) as total_correct_answers'),
                DB::raw('SUM(records.total_questions) as total_questions')
            )
            ->groupBy('user_name')
            ->orderByDesc('total_correct_answers')
            ->get();

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

        return response()->json($quizResults);
    }
}


