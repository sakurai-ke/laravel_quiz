<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Record;
use App\Models\Result;

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
}
