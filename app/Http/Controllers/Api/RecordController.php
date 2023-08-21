<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Record;

class RecordController extends Controller
{
    public function storeRecord(Request $request)
    {
        // リクエストから受け取ったデータを元に新しいRecordモデルを作成し保存
        $record = Record::create([
            'category_id' => $request->category_id,
            'user_id' => $request->user_id,
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
        // リクエストから受け取ったデータを元に新しいResultモデルを作成し保存
        $result = Result::create([
            'result_id' => $request->result_id,
            'quiz_id' => $request->quiz_id,
            'selected_choice' => $request->selected_choice,
            'correct' => $request->correct,
            'created_at' => $request->created_at,
            'updated_at' => $request->updated_at,
        ]);

        return response()->json(['message' => 'Result created successfully', 'data' => $result]);
    }
}
