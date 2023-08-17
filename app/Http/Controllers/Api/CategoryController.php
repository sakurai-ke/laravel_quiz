<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
            $categories = Category::select('id', 'name')->get();
            // Inertia::share('categories', $categories); // カテゴリーデータを共有
            // dd($categories);
            // return Inertia::render('Top'); // Top コンポーネントを表示
            // return response()->json($categories);
            return Inertia::render('Top/Top');
    }
    public function category()
    {
        $categories = Category::select('id', 'name')->get();
        return response()->json($categories);
    }

}
