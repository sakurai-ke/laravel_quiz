<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Role;

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
        $roleName = $request->input('role');
        
        try {
            // ユーザーの現在のロールを取得
            $currentRole = $user->roles->first(); // ユーザーの現在のロールを取得（仮定）
            
            // リクエストから取得したロール名と現在のロールが異なる場合にのみ更新
            if ($currentRole->name !== $roleName) {
                // 新しいロールを取得
                $newRole = Role::where('name', $roleName)->firstOrFail();
                
                // 中間テーブルの role_id を更新
                $user->roles()->updateExistingPivot($currentRole->id, ['role_id' => $newRole->id]);
            }
    
            // 成功レスポンスを返す
            return response()->json(['message' => '権限が保存されました']);
        } catch (\Exception $e) {
            // エラーが発生した場合のエラーハンドリング
            return response()->json(['message' => '権限の保存中にエラーが発生しました'], 500);
        }
    }
    
    public function getUser(User $user)
    {
        // ユーザーがadmin権限を持つ場合のみユーザーデータを返す
        if ($user->roles->contains('name', 'admin')) {
            return response()->json($user);
        } else {
            return response()->json(['message' => '権限がありません'], 403);
        }
    }
    
}