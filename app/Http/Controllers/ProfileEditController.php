<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileEditController extends Controller
{
    public function edit()
    {
        // プロファイル情報を編集するページを表示
        return Inertia::render('ProfileEdit', [
            'user' => Auth::user(),
        ]);
    }

    public function update(Request $request)
    {
        $user = Auth::user();
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            // 他のプロファイル情報のバリデーションルールをここに追加
        ]);

        // プロファイル情報を更新
        $user->update($data);

        return redirect()->route('profile.edit')->with('success', 'プロファイルが更新されました。');
    }
}
