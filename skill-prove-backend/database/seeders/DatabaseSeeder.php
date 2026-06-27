<?php

namespace Database\Seeders;

use App\Models\CandidateProfile;
use App\Models\Challenge;
use App\Models\CompanyProfile;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
   // database/seeders/DatabaseSeeder.php
public function run(): void
{
    // Admin
    User::create([
        'name' => 'Admin', 'email' => 'admin@skillproof.app',
        'password' => Hash::make('password'), 'role' => 'admin',
    ]);

    // Candidate
    $candidate = User::create([
        'name' => 'Layla Abdullah', 'email' => 'layla@skillproof.app',
        'password' => Hash::make('password'), 'role' => 'candidate',
    ]);
    CandidateProfile::create([
        'user_id' => $candidate->id,
        'title' => 'Full-Stack Developer',
        'location' => 'Riyadh, Saudi Arabia',
        'reputation' => 4820, 'readiness' => 86, 'profile_completion' => 78,
    ]);

    // Company
    $company = User::create([
        'name' => 'Nova Labs', 'email' => 'nova@skillproof.app',
        'password' => Hash::make('password'), 'role' => 'company',
    ]);
    CompanyProfile::create([
        'user_id' => $company->id,
        'company_name' => 'Nova Labs', 'verified' => true,
    ]);

    // Challenge
    Challenge::create([
        'company_id' => $company->id,
        'title_ar' => 'بناء API بمعدّل أداء عالٍ',
        'title_en' => 'High-Performance REST Auth API',
        'category' => 'Backend', 'difficulty' => 'Advanced',
        'duration' => '3h', 'reward' => 250,
    ]);
}
}
