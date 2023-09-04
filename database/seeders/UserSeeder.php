<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'name' => 'test',
            'email' => 'test@test.com',
            'password' => Hash::make('password123'),
            // 'role_id' => 1,
            ]);
        DB::table('users')->insert([
            'name' => 'test2',
            'email' => 'test2@test.com',
            'password' => Hash::make('password123'),
            // 'role_id' => 2,
            ]);
        DB::table('users')->insert([
            'name' => 'test3',
            'email' => 'test3@test.com',
            'password' => Hash::make('password123'),
            // 'role_id' => 2,
            ]);
        DB::table('users')->insert([
            'name' => 'test4',
            'email' => 'test4@test.com',
            'password' => Hash::make('password123'),
            // 'role_id' => 2,
            ]);
        DB::table('users')->insert([
            'name' => 'test5',
            'email' => 'test5@test.com',
            'password' => Hash::make('password123'),
            // 'role_id' => 2,
            ]);
        DB::table('users')->insert([
            'name' => 'test6',
            'email' => 'test6@test.com',
            'password' => Hash::make('password123'),
            // 'role_id' => 2,
            ]);
        DB::table('users')->insert([
            'name' => 'test7',
            'email' => 'test7@test.com',
            'password' => Hash::make('password123'),
            // 'role_id' => 2,
            ]);
        DB::table('users')->insert([
            'name' => 'test8',
            'email' => 'test8@test.com',
            'password' => Hash::make('password123'),
            // 'role_id' => 2,
            ]);
        DB::table('users')->insert([
            'name' => 'test9',
            'email' => 'test9@test.com',
            'password' => Hash::make('password123'),
            // 'role_id' => 2,
            ]);
        DB::table('users')->insert([
            'name' => 'test10',
            'email' => 'test10@test.com',
            'password' => Hash::make('password123'),
            // 'role_id' => 2,
            ]);
        DB::table('users')->insert([
            'name' => 'test11',
            'email' => 'test11@test.com',
            'password' => Hash::make('password123'),
            // 'role_id' => 2,
            ]);
        DB::table('users')->insert([
            'name' => 'test12',
            'email' => 'test12@test.com',
            'password' => Hash::make('password123'),
            // 'role_id' => 2,
            ]);                           
    }
}
