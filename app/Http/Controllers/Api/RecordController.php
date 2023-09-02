<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Record;
use App\Models\Result;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class RecordController extends Controller
{
    public function storeRecord(Request $request)
    {
        // リクエストから受け取ったデータを元に新しいRecordモデルを作成し保存
        $record = Record::create([
            'category_id' => $request->category_id,
            'user_id' => auth()->user()->id, // ログイン中のユーザーIDを使用
            'total_questions' => $request->total_questions,
            'correct_answers' => $request->correct_answers,
            'accuracy' => $request->accuracy,
            'created_at' => $request->created_at,
            'updated_at' => $request->updated_at,
        ]);

        return response()->json(['message' => 'Record created successfully', 'data' => $record]);
    }

    public function storeResult(Request $request)
    {

    // 対応するRecordレコードを取得
    $record = Record::find($request->record_id);
    
        // リクエストから受け取ったデータを元に新しいResultモデルを作成し保存
        $result = Result::create([
            'record_id' => $request->record_id,
            'quiz_id' => $request->quiz_id,
            'selected_choice' => $request->selected_choice,
            'correct' => $request->correct,
            'created_at' => $request->created_at,
            'updated_at' => $request->updated_at,
        ]);

            // Recordが存在しない場合のエラー処理
    if (!$record) {
        return response()->json(['error' => 'Invalid record_id']);
    }

    // レコードが正しいユーザーに紐づいているか確認
    if ($record->user_id !== auth()->user()->id) {
        return response()->json(['error' => 'Record does not belong to the authenticated user']);
    }

        return response()->json(['message' => 'Result created successfully', 'data' => $result]);
    }

    public function paginate(Request $request)
{
    $results = Record::orderBy('created_at', 'desc')
        ->paginate(10); // 1ページに10個ずつ表示する

    return $results;
}

public function index()
{
    // ログインユーザーのIDを取得
    $userId = Auth::id();

    // ログインユーザーが実施したクイズの結果情報をページネーションで取得
    $records = Record::with(['results', 'user'])
        ->where('user_id', $userId)
        ->orderBy('created_at', 'desc') // 任意の並び替えを追加
        ->paginate(10); // 1ページあたり10件ずつ表示

    // Inertiaを使用してデータをVueコンポーネントに渡す
    return Inertia::render('Record/Record', [
        'records' => $records,
    ]);
}

    public function showRecord(Request $request)
    {
        // ログインユーザーのIDを取得
        $userId = Auth::id();

        $quizResults = Record::with(['category', 'results', 'results.quiz'])
            ->where('user_id', $userId); // ログインユーザーのクイズ結果のみ取得

        if ($request->has('fromDate')) {
            $fromDate = Carbon::parse($request->fromDate)->startOfDay();
            $quizResults->whereDate('created_at', '>=', $fromDate);
        }

        if ($request->has('toDate')) {
            $toDate = Carbon::parse($request->toDate)->endOfDay();
            $quizResults->whereDate('created_at', '<=', $toDate);
        }

        $quizResults = $quizResults->select('id', 'category_id', 'correct_answers', 'total_questions', 'accuracy', 'created_at')
            ->get();
            
        return response()->json($quizResults);
    }
}
