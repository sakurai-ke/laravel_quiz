<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
use App\Models\Answer;
use App\Models\Category;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Quiz>
 */
class QuizFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $userId = User::inRandomOrder()->value('id');
        $categoryId = Category::inRandomOrder()->value('id');
        return [
            'title' => $this->faker->sentence,
            'user_id' => $userId,
            'correct_answer' => $this->faker->word,
            'wrong_answer_1' => $this->faker->word,
            'wrong_answer_2' => $this->faker->word,
            'wrong_answer_3' => $this->faker->word,
            'hint' => $this->faker->sentence,
            'explain' => $this->faker->sentence,
            'category_id' => $categoryId,
            'image_src' => $this->faker->imageUrl(400, 300),
            'delete_flag' => $this->faker->numberBetween(0, 1),
        ];
    }
}
