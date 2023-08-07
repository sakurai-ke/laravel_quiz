<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Quiz;

class QuizController extends Controller
{

    public function getQuizzes(Request $request)
    {
        $categoryId = $request->input('category_id');
        $numQuestions = $request->input('num_questions');


        $quizzes = Quiz::select('id', 'title', 'image_src', 'user_id', 'answer_id', 'category_id', 'delete_flag')
        ->where('category_id', $categoryId)
        ->limit($numQuestions)
        ->get();

        // $quizzes = Quiz::inRandomOrder()
        //     ->where('category_id', $categoryId)
        //     ->limit($numQuestions)
        //     ->get();

        return response()->json($quizzes);
    }    

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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
