<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Record;

class RecordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // $requestから必要な情報を取得
        $data = $request->all();
    
        // Recordモデルを使用してクイズ結果を保存
        $quizResult = Record::create([
            'user_id' => auth()->user()->id, // ユーザーID
            // 必要な情報を他にも追加
        ]);
    
        return response()->json(['message' => 'Result saved successfully']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    { 
        $correctPercentage = (float)$request->query('correctPercentage'); // URLのクエリパラメータから値を取得
        return Inertia::render('Record/Record', [
            'correctPercentage' => $correctPercentage,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
