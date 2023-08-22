<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;


class RecordSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 1000) as $index) {
            $categoryId = $faker->numberBetween(1, 5);
            $userId = $faker->numberBetween(1, 12);
            $totalQuestions = $faker->randomElement([5, 10, 15, 20]);
            
            // Calculate correct answers based on selected choice
            $selectedChoice = $faker->randomElement(['correct_answer', 'wrong_answer_1', 'wrong_answer_2', 'wrong_answer_3']);
            if ($selectedChoice === 'correct_answer') {
                $correctAnswers = $faker->numberBetween(1, $totalQuestions); // Adjust the range
            } else {
                $correctAnswers = $faker->numberBetween(0, $totalQuestions); // Adjust the range
            }

            $accuracy = ($correctAnswers / $totalQuestions) * 100;

            // Create a random past date within the last 3 years
            $createdAt = $faker->dateTimeBetween('-3 years', 'now');

            DB::table('records')->insert([
                'category_id' => $categoryId,
                'user_id' => $userId,
                'total_questions' => $totalQuestions,
                'correct_answers' => $correctAnswers,
                'accuracy' => $accuracy,
                'created_at' => $createdAt,
                'updated_at' => $createdAt,
            ]);
        }
    }
}
