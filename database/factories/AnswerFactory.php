<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;
// use App\Models\User;
// use App\Models\Answer;
use App\Models\Category;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Answer>
 */
class AnswerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $categoryId = Category::inRandomOrder()->value('id');
        return [
            'answer_1' => $this->faker->word,
            'answer_2' => $this->faker->word,
            'answer_3' => $this->faker->word,
            'answer_4' => $this->faker->word,
            'correct_answer_no' => $this->faker->numberBetween(1, 4),
            'hint' => $this->faker->sentence,
            'explain' => $this->faker->sentence,
            'category_id' => $categoryId,
        ];
    }
}
