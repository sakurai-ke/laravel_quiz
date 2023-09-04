<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use OpenAI\Laravel\Facades\OpenAI;

class ChatGptController extends Controller
{
// ヒントを取得するメソッド
public function getHint(Request $request)
{
    // クイズの問題文と正解の選択肢をリクエストから取得
    $problemStatement = $request->input('title');
    $correctAnswer = $request->input('correct_answer');

    // ChatGpt APIに送信するデータを構築
    $messages = [
        [
            'role' => 'system',
            'content' => 'You are a helpful assistant that provides hints.',
        ],
        [
            'role' => 'user',
            'content' => "問題:$problemStatement\n正解:$correctAnswer\n
            以上の問題と正解の情報から、回答者に簡単なヒントを教えてください。
            ただし、正解の情報は絶対に教えないでください",
        ],
    ];

    // ChatGpt APIにリクエストを送信
    $response = OpenAI::chat()->create([
        'messages' => $messages,
        'model' => 'gpt-3.5-turbo',
        'temperature' => 0.7,
        'max_tokens' => 150,
    ]);

    // ChatGptからのレスポンスからヒントを取得
    $hint = $response['choices'][0]['message']['content'];

    // ヒントに正解が含まれているかを確認
    if (stripos($hint, $correctAnswer) !== false) {
        // 正解が含まれている場合、新しいリクエストを送信して再試行
        $response = OpenAI::chat()->create([
            'messages' => $messages,
            'model' => 'gpt-3.5-turbo',
            'temperature' => 0.7,
            'max_tokens' => 150,
        ]);

        // ChatGptからの新しいレスポンスからヒントを取得
        $hint = $response['choices'][0]['message']['content'];
    }

    // ヒント情報をJSON形式でレスポンスとして返す
    return response()->json(['hint' => $hint]);

    }
}
