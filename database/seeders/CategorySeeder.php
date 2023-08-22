<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        {
            DB::table('categories')->insert([
                ['name' => 'スポーツ'],
                ['name' => '雑学'],
                ['name' => '自然'],
                ['name' => 'IT'],
                ['name' => 'アニメ'],
            ]);
        }
    
    }
}
