<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class ResultSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 1000) as $recordId) {
            $totalQuestions = DB::table('records')->where('id', $recordId)->value('total_questions');

            foreach (range(1, $totalQuestions) as $index) {
                $quizId = $faker->numberBetween(1, 1000);
                $selectedChoice = $faker->randomElement(['correct_answer', 'wrong_answer_1', 'wrong_answer_2', 'wrong_answer_3']);
                $correct = ($selectedChoice === 'correct_answer') ? 1 : 0;

                $createdAt = $faker->dateTimeBetween('-3 years', 'now');

                DB::table('results')->insert([
                    'record_id' => $recordId,
                    'quiz_id' => $quizId,
                    'selected_choice' => $selectedChoice,
                    'correct' => $correct,
                    'created_at' => $createdAt,
                    'updated_at' => $createdAt,
                ]);
            }
        }
    }
}
