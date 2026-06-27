<?php
namespace Database\Seeders;

use App\Models\User;
use App\Models\CandidateProfile;
use App\Models\CompanyProfile;
use App\Models\Challenge;
use App\Models\CompanyJobs;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ── شركات ──────────────────────────────────────────
        $companiesData = [
            ['name'=>'TechCorp Arabia',   'email'=>'techcorp@skillproof.app',   'company_name'=>'TechCorp Arabia',   'industry'=>'Technology'],
            ['name'=>'Digital Ventures',  'email'=>'digitalventures@skillproof.app', 'company_name'=>'Digital Ventures', 'industry'=>'Fintech'],
        ];

        foreach ($companiesData as $c) {
            [$user, $created] = [
                User::firstOrCreate(
                    ['email' => $c['email']],
                    ['name' => $c['name'], 'password' => Hash::make('password'), 'role' => 'company']
                ),
                null,
            ];

            CompanyProfile::firstOrCreate(
                ['user_id' => $user->id],
                ['company_name' => $c['company_name'], 'industry' => $c['industry'], 'description' => 'شركة رائدة في '.$c['industry']]
            );

            if (!Challenge::where('company_id', $user->id)->exists()) {
                Challenge::create([
                    'company_id'      => $user->id,
                    'title'           => 'تحدي تطوير واجهة مستخدم - '.$c['company_name'],
                    'description'     => 'بناء صفحة dashboard باستخدام React و Tailwind',
                    'difficulty'      => 'medium',
                    'skills_required' => ['React','TypeScript','Tailwind'],
                    'deadline'        => now()->addDays(30),
                    'xp_reward'       => 150,
                    'status'          => 'active',
                ]);
            }

            if (!CompanyJobs::where('company_id', $user->id)->exists()) {
                CompanyJobs::create([
                    'company_id'      => $user->id,
                    'title'           => 'مطور Frontend - '.$c['company_name'],
                    'description'     => 'نبحث عن مطور React متمرس',
                    'type'            => 'remote',
                    'location'        => 'Remote',
                    'salary_range'    => '5000-8000 SAR',
                    'skills_required' => ['React','TypeScript'],
                    'status'          => 'active',
                ]);
            }
        }

        // ── مرشحون ─────────────────────────────────────────
        $candidatesData = [
            ['name'=>'Layla Al-Rashidi', 'email'=>'layla@skillproof.app',  'skills'=>['React','TypeScript','UI/UX'],     'xp'=>850],
            ['name'=>'Ahmed Hassan',     'email'=>'ahmed@skillproof.app',  'skills'=>['Node.js','Laravel','MySQL'],       'xp'=>720],
            ['name'=>'Sara Mohammed',    'email'=>'sara@skillproof.app',   'skills'=>['Python','Data Science','ML'],      'xp'=>1200],
        ];

        foreach ($candidatesData as $c) {
            $user = User::firstOrCreate(
                ['email' => $c['email']],
                ['name' => $c['name'], 'password' => Hash::make('password'), 'role' => 'candidate']
            );

            CandidateProfile::firstOrCreate(
                ['user_id' => $user->id],
                [
                    'skills'    => $c['skills'],
                    'xp_points' => $c['xp'],
                    'level'     => intdiv($c['xp'], 300) + 1,
                    'bio'       => 'مطور متحمس بخبرة في '.implode(', ', $c['skills']),
                ]
            );
        }

        // ── Admin ───────────────────────────────────────────
        User::firstOrCreate(
            ['email' => 'admin@skillproof.app'],
            ['name' => 'Admin', 'password' => Hash::make('password'), 'role' => 'admin']
        );

        $this->command->info('✅ تم إنشاء البيانات التجريبية بنجاح');
    }
}
