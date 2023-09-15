<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

class UserProfileController extends Controller
{
    public function index()
    {
        // ユーザー一覧を取得し、それぞれのロール情報を含めて取得
        $users = User::with('roles')->get();
    
        // Inertiaを使用してVueコンポーネントにデータを渡す
        return Inertia::render('Profile/List', [
            'users' => $users,
        ]);
    }

    public function saveUserRole(User $user, Request $request)
    {
        // リクエストから選択されたロールを取得
        $role = $request->input('role');

        try {
            // ユーザーに新しいロールを割り当てる
            $user->update(['role' => $role]);

            // 成功レスポンスを返す
            return response()->json(['message' => '権限が保存されました']);
        } catch (\Exception $e) {
            // エラーが発生した場合のエラーハンドリング
            return response()->json(['message' => '権限の保存中にエラーが発生しました'], 500);
        }
    }

    public function getUser(User $user)
    {
        return response()->json($user);
    }

}