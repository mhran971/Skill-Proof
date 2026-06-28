<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\CandidateProfile;
use App\Models\CompanyProfile;
use App\Models\Education;
use App\Models\Certification;
use App\Models\PortfolioItem;
use App\Models\Skill;
use App\Models\UserSkill;
use App\Models\Challenge;
use App\Models\ChallengeRubric;
use App\Models\Submission;
use App\Models\SubmissionLink;
use App\Models\SubmissionScore;
use App\Models\SubmissionRubricScore;
use App\Models\CompanyJob;
use App\Models\CandidateJobApplication;
use App\Models\InterviewSession;
use App\Models\Video;
use App\Models\Internship;
use App\Models\UserInternship;
use App\Models\Task;
use App\Models\TaskAssignment;
use App\Models\ActivityLog;
use App\Models\FraudAlert;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ── 1. Users (10) ──────────────────────────────────────
        $users = [];
        $candidateNames = ['Ahmed Al-Saeed', 'Fatima Hassan', 'Omar Khaled', 'Layla Mahmoud', 'Youssef Ibrahim'];
        $companyNames = ['TechFlow', 'DataVibe', 'CodeCrafters', 'CloudNine', 'PixelForge'];
        $locations = ['Cairo, Egypt', 'Riyadh, KSA', 'Dubai, UAE', 'Amman, Jordan', 'Doha, Qatar'];
        $industries = ['Software', 'AI & Data', 'Web Development', 'Cloud Services', 'Mobile Solutions'];
        $titles = ['Frontend Developer', 'Backend Developer', 'Data Scientist', 'Mobile Developer', 'DevOps Engineer'];
        $schools = ['Cairo University', 'Ain Shams University', 'Alexandria University', 'KAUST', 'AUC'];
        $degrees = ['BSc Computer Science', 'BSc Software Engineering', 'BSc Data Science', 'MSc AI', 'BSc Information Systems'];
        $gpas = ['3.8 / 4.0', '3.5 / 4.0', 'Honors', '3.9 / 4.0', '3.7 / 4.0'];
        $certNames = ['AWS Solutions Architect', 'Google Cloud Professional', 'React Developer', 'Laravel Certified', 'Python Data Analyst'];
        $issuers = ['Amazon', 'Google', 'Meta', 'Laravel', 'Coursera'];
        $projects = ['E-Commerce Platform', 'AI Chatbot', 'Data Dashboard', 'Mobile Banking App', 'Cloud Infrastructure'];
        $stacks = ['React · Node · Postgres', 'Python · TensorFlow · Flask', 'Vue · D3.js · Firebase', 'Flutter · Dart · Firebase', 'AWS · Terraform · Docker'];
        $challengeTitlesAr = ['بناء API متكامل', 'تصميم واجهة المستخدم', 'تحليل البيانات', 'تطوير تطبيق موبايل', 'بنية تحتية سحابية'];
        $challengeTitlesEn = ['Build Full API', 'UI/UX Design', 'Data Analysis', 'Mobile App Dev', 'Cloud Infrastructure'];
        $jobTitles = ['Senior Frontend Developer', 'Backend Engineer', 'Data Scientist', 'Mobile Developer', 'DevOps Engineer', 'Full Stack Developer', 'UI/UX Designer', 'Product Manager', 'QA Engineer', 'Security Analyst'];
        $jobTypes = ['full-time', 'part-time', 'remote', 'hybrid'];
        $videoTitlesAr = ['تعلم React من الصفر', 'Laravel للمبتدئين', 'تحليل البيانات بـ Python', 'Docker شرح مبسط', 'Flutter تطبيقات الموبايل'];
        $videoTitlesEn = ['Learn React from Scratch', 'Laravel for Beginners', 'Data Analysis with Python', 'Docker Simplified', 'Flutter Mobile Apps'];
        $internshipTitlesAr = ['تدريب تطوير الويب', 'تدريب الذكاء الاصطناعي', 'تدريب تحليل البيانات', 'تدريب الأمن السيبراني', 'تدريب إدارة المنتجات'];
        $internshipTitlesEn = ['Web Development Internship', 'AI Internship', 'Data Analysis Internship', 'Cybersecurity Internship', 'Product Management Internship'];
        $internshipDurations = ['12 weeks', '6 months', '3 months', '4 months', '8 weeks'];
        $taskTitlesAr = ['إصلاح خطأ في React', 'تحسين أداء API', 'إنشاء تقرير بيانات', 'تصميم شعار', 'كتابة وثائق تقنية'];
        $taskTitlesEn = ['Fix React Bug', 'Optimize API Performance', 'Create Data Report', 'Design Logo', 'Write Technical Docs'];
        $taskTimes = ['30m', '1h', '2h', '4h', '1d'];
        $activitiesAr = ['أكمل تحدياً جديداً', 'تقدم لوظيفة', 'حصل على شهادة', 'أضاف مهارة جديدة', 'أكمل مقابلة'];
        $activitiesEn = ['Completed a new challenge', 'Applied for a job', 'Earned a certificate', 'Added a new skill', 'Completed an interview'];
        $fraudTypes = ['plagiarism', 'fake_account', 'multiple_submissions', 'suspicious_activity', 'impersonation'];
        $rubricKeys = ['code', 'problem', 'arch', 'testing', 'docs', 'comm', 'delivery', 'team', 'present'];
        $badgeTiers = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'];
        $difficulties = ['Beginner', 'Intermediate', 'Advanced'];
        $challengeDurations = ['2h', '3h', '90m', '4h', '1h'];
        $challengeCategories = ['Frontend', 'Backend', 'Data', 'Mobile', 'DevOps'];
        $levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
        $applicationStatuses = ['applied', 'reviewed', 'shortlisted', 'rejected', 'hired'];
        $submissionStatuses = ['pending_ai', 'ai_done', 'in_review', 'accepted', 'rejected'];
        $taskStatuses = ['in_progress', 'completed', 'paid'];
        $severities = ['low', 'medium', 'high'];

        // Admin
        $users[] = User::create([
            'name'     => 'Admin User',
            'email'    => 'admin@skillprove.com',
            'password' => Hash::make('password'),
            'role'     => 'admin',
            'avatar'   => 'https://i.pravatar.cc/150?u=admin',
            'location' => 'Cairo, Egypt',
            'title'    => 'System Administrator',
        ]);

        // Candidates (5)
        foreach ($candidateNames as $i => $name) {
            $user = User::create([
                'name'               => $name,
                'email'              => 'candidate' . ($i + 1) . '@skillprove.com',
                'password'           => Hash::make('password'),
                'role'               => 'candidate',
                'avatar'             => 'https://i.pravatar.cc/150?u=candidate' . ($i + 1),
                'location'           => $locations[$i],
                'title'              => $titles[$i],
                'profile_completion' => rand(40, 95),
                'reputation'         => rand(100, 5000),
                'readiness'          => rand(30, 95),
                'badge_tier'         => $badgeTiers[rand(0, 4)],
            ]);
            $users[] = $user;

            CandidateProfile::create([
                'user_id'       => $user->id,
                'bio'           => 'Experienced developer passionate about building scalable applications.',
                'skills'          => json_encode(['React', 'Laravel', 'Python', 'Docker']),
                'xp_points'       => rand(500, 15000),
                'level'           => rand(1, 15),
                'github_url'      => 'https://github.com/' . strtolower(str_replace(' ', '', $name)),
                'linkedin_url'    => 'https://linkedin.com/in/' . strtolower(str_replace(' ', '-', $name)),
                'portfolio_url'   => 'https://' . strtolower(str_replace(' ', '', $name)) . '.dev',
                'avatar_url'      => $user->avatar,
            ]);
        }

        // Companies (5)
        foreach ($companyNames as $i => $name) {
            $user = User::create([
                'name'     => $name . ' HR',
                'email'    => 'company' . ($i + 1) . '@skillprove.com',
                'password' => Hash::make('password'),
                'role'     => 'company',
                'avatar'   => 'https://i.pravatar.cc/150?u=company' . ($i + 1),
                'location' => $locations[$i],
                'title'    => 'HR Manager',
            ]);
            $users[] = $user;

            CompanyProfile::create([
                'user_id'      => $user->id,
                'company_name' => $name,
                'industry'     => $industries[$i],
                'description'  => 'Leading technology company specializing in innovative solutions.',
                'website'      => 'https://' . strtolower($name) . '.com',
                'logo_url'     => 'https://i.pravatar.cc/150?u=' . strtolower($name),
                'location'     => $user->location,
            ]);
        }

        $candidateUsers = array_slice($users, 1, 5);
        $companyUsers = array_slice($users, 6, 5);

        // ── 2. Educations (5) ─────────────────────────────────
        foreach ($candidateUsers as $i => $user) {
            Education::create([
                'user_id'    => $user->id,
                'school'     => $schools[$i],
                'degree'     => $degrees[$i],
                'years'      => (2018 + $i) . ' — ' . (2022 + $i),
                'gpa'        => $gpas[$i],
                'sort_order' => $i,
            ]);
        }

        // ── 3. Certifications (5) ───────────────────────────────
        foreach ($candidateUsers as $i => $user) {
            Certification::create([
                'user_id'        => $user->id,
                'name'           => $certNames[$i],
                'issuer'         => $issuers[$i],
                'year'           => 2020 + $i,
                'credential_url' => 'https://verify.example.com/cert/' . ($i + 1),
            ]);
        }

        // ── 4. Portfolio Items (5) ──────────────────────────────
        foreach ($candidateUsers as $i => $user) {
            PortfolioItem::create([
                'user_id'     => $user->id,
                'name'        => $projects[$i],
                'stack'       => $stacks[$i],
                'url'         => 'https://github.com/demo/' . ($i + 1),
                'thumb_url'   => 'https://picsum.photos/400/300?random=' . ($i + 1),
                'description' => 'A comprehensive project demonstrating advanced skills and best practices.',
                'sort_order'  => $i,
            ]);
        }

        // ── 5. Skills (10) ─────────────────────────────────────
        $skillData = [
            ['name' => 'React', 'category' => 'Frontend'],
            ['name' => 'Laravel', 'category' => 'Backend'],
            ['name' => 'Python', 'category' => 'Data'],
            ['name' => 'Docker', 'category' => 'DevOps'],
            ['name' => 'Flutter', 'category' => 'Mobile'],
            ['name' => 'Vue.js', 'category' => 'Frontend'],
            ['name' => 'Node.js', 'category' => 'Backend'],
            ['name' => 'TensorFlow', 'category' => 'Data'],
            ['name' => 'AWS', 'category' => 'DevOps'],
            ['name' => 'Swift', 'category' => 'Mobile'],
        ];
        $skills = [];
        foreach ($skillData as $data) {
            $skills[] = Skill::create($data);
        }

        // User Skills (10)
        foreach ($candidateUsers as $i => $user) {
            for ($j = 0; $j < 2; $j++) {
                UserSkill::create([
                    'user_id'  => $user->id,
                    'skill_id' => $skills[($i * 2 + $j) % count($skills)]->id,
                    'level'    => $levels[rand(1, 3)],
                    'score'    => rand(40, 100),
                ]);
            }
        }

        // ── 6. Challenges (10) ───────────────────────────────────
        $challenges = [];
        foreach ($companyUsers as $i => $company) {
            for ($j = 0; $j < 2; $j++) {
                $idx = ($i * 2 + $j) % 5;
                $challenge = Challenge::create([
                    'company_id'      => $company->id,
                    'title_ar'        => $challengeTitlesAr[$idx] . ' ' . ($j + 1),
                    'title_en'        => $challengeTitlesEn[$idx] . ' ' . ($j + 1),
                    'description_ar'  => 'تحدي ممتاز لتطوير المهارات في ' . $challengeTitlesAr[$idx],
                    'description_en'  => 'Excellent challenge to develop skills in ' . $challengeTitlesEn[$idx],
                    'skills_required' => json_encode([$skills[$idx]->name, $skills[($idx + 1) % 10]->name]),
                    'category'        => $challengeCategories[$idx],
                    'difficulty'      => $difficulties[rand(0, 2)],
                    'duration'        => $challengeDurations[$idx],
                    'reward'          => rand(100, 1000),
                    'status'          => 'active',
                ]);
                $challenges[] = $challenge;

                // Challenge Rubrics
                foreach ($rubricKeys as $rk => $key) {
                    ChallengeRubric::create([
                        'challenge_id' => $challenge->id,
                        'rubric_key'   => $key,
                        'weight'       => rand(1, 5),
                        'sort_order'   => $rk,
                    ]);
                }
            }
        }

        // ── 7. Submissions (10) ────────────────────────────────
        $submissions = [];
        foreach ($candidateUsers as $i => $user) {
            for ($j = 0; $j < 2; $j++) {
                $challenge = $challenges[($i * 2 + $j) % count($challenges)];
                $submission = Submission::create([
                    'user_id'              => $user->id,
                    'challenge_id'         => $challenge->id,
                    'reviewer_id'          => null,
                    'type'                 => ['regular', 'final'][rand(0, 1)],
                    'status'               => $submissionStatuses[rand(0, 4)],
                    'feedback_ar'          => 'عمل جيد ولكن يحتاج تحسين في الأداء.',
                    'feedback_en'          => 'Good work but needs performance improvement.',
                    'ai_score'             => rand(50, 100) / 10,
                    'ai_feedback_ar'       => 'التقييم الذكي: أداء مقبول مع بعض الأخطاء.',
                    'ai_feedback_en'       => 'AI Evaluation: Acceptable performance with some errors.',
                    'ai_evaluated_at'      => now()->subDays(rand(1, 10)),
                    'accepted_to_showcase' => rand(0, 1) === 1,
                    'submitted_at'         => now()->subDays(rand(1, 30)),
                ]);
                $submissions[] = $submission;

                // Submission Links
                SubmissionLink::create([
                    'submission_id' => $submission->id,
                    'url'           => 'https://github.com/demo/submission-' . $submission->id,
                    'type'          => 'github',
                ]);
                SubmissionLink::create([
                    'submission_id' => $submission->id,
                    'url'           => 'https://demo.example.com/project-' . $submission->id,
                    'type'          => 'demo',
                ]);

                // Submission Scores
                if (rand(0, 1) === 1) {
                    SubmissionScore::create([
                        'submission_id' => $submission->id,
                        'score'         => rand(60, 100),
                        'feedback'      => 'Well structured solution.',
                        'scored_by'     => $companyUsers[rand(0, 4)]->id,
                    ]);
                }

                // Submission Rubric Scores
                foreach ($rubricKeys as $key) {
                    SubmissionRubricScore::create([
                        'submission_id' => $submission->id,
                        'rubric_key'    => $key,
                        'score'         => rand(50, 100) / 10,
                        'scored_by'     => $companyUsers[rand(0, 4)]->id,
                        'is_ai'         => rand(0, 1) === 1,
                    ]);
                }
            }
        }

        // ── 8. Company Jobs (10) ───────────────────────────────
        $companyJobs = [];
        foreach ($companyUsers as $i => $company) {
            for ($j = 0; $j < 2; $j++) {
                $idx = ($i * 2 + $j);
                $job = CompanyJob::create([
                    'company_id'      => $company->id,
                    'title'           => $jobTitles[$idx],
                    'location'        => $locations[$idx % 5],
                    'salary_min'      => rand(5000, 10000),
                    'salary_max'      => rand(15000, 30000),
                    'description'     => 'We are looking for a talented ' . $jobTitles[$idx] . ' to join our team.',
                    'type'            => $jobTypes[$idx % 4],
                    'skills_required' => json_encode([$skills[$idx % 10]->name, $skills[($idx + 1) % 10]->name]),
                    'deadline'        => now()->addDays(rand(10, 60))->toDateString(),
                    'status'          => 'open',
                    'applicants_count'=> rand(0, 20),
                ]);
                $companyJobs[] = $job;
            }
        }

        // Candidate Job Applications (10)
        foreach ($candidateUsers as $i => $user) {
            for ($j = 0; $j < 2; $j++) {
                CandidateJobApplication::create([
                    'user_id'    => $user->id,
                    'job_id'     => $companyJobs[($i * 2 + $j) % count($companyJobs)]->id,
                    'status'     => $applicationStatuses[rand(0, 4)],
                    'cover_note' => 'I am excited to apply for this position. My experience aligns well with your requirements.',
                    'applied_at' => now()->subDays(rand(1, 20)),
                ]);
            }
        }

        // ── 9. Interview Sessions (5) ─────────────────────────
        foreach ($candidateUsers as $i => $user) {
            $questions = [
                ['ar' => 'ما هي نقاط قوتك؟', 'en' => 'What are your strengths?'],
                ['ar' => 'كيف تتعامل مع الضغط؟', 'en' => 'How do you handle pressure?'],
                ['ar' => 'صف مشروعاً نجحت فيه.', 'en' => 'Describe a project you succeeded in.'],
            ];
            $answers = [
                ['index' => 0, 'text' => 'I am very detail-oriented and persistent.', 'recorded_at' => now()->subDays(2)->toDateTimeString()],
                ['index' => 1, 'text' => 'I prioritize tasks and take breaks when needed.', 'recorded_at' => now()->subDays(2)->toDateTimeString()],
            ];
            $aiFeedback = [
                ['index' => 0, 'feedback_ar' => 'إجابة جيدة مع أمثلة.', 'feedback_en' => 'Good answer with examples.', 'score' => 8.5],
                ['index' => 1, 'feedback_ar' => 'إجابة مقنعة.', 'feedback_en' => 'Convincing answer.', 'score' => 7.5],
            ];

            InterviewSession::create([
                'user_id'       => $user->id,
                'questions'     => json_encode($questions),
                'answers'       => json_encode($answers),
                'ai_feedback'   => json_encode($aiFeedback),
                'overall_score' => 8.0,
                'status'        => 'completed',
                'completed_at'  => now()->subDays(2),
            ]);
        }

        // ── 10. Videos (10) ────────────────────────────────────
        foreach ($candidateUsers as $i => $user) {
            for ($j = 0; $j < 2; $j++) {
                $idx = ($i * 2 + $j) % 5;
                Video::create([
                    'user_id'    => $user->id,
                    'title_ar'   => $videoTitlesAr[$idx] . ' ' . ($j + 1),
                    'title_en'   => $videoTitlesEn[$idx] . ' ' . ($j + 1),
                    'duration'   => ['4:12', '10:30', '15:45', '8:20', '22:10'][$idx],
                    'views'      => rand(100, 5000),
                    'thumb_url'  => 'https://picsum.photos/400/225?random=' . ($i * 2 + $j + 1),
                    'video_url'  => 'https://example.com/videos/' . ($i * 2 + $j + 1),
                    'ai_summary' => 'This video covers the fundamentals and advanced topics.',
                ]);
            }
        }

        // ── 11. Internships (10) ───────────────────────────────
        $internships = [];
        foreach ($companyUsers as $i => $company) {
            for ($j = 0; $j < 2; $j++) {
                $idx = ($i * 2 + $j) % 5;
                $internship = Internship::create([
                    'company_id' => $company->id,
                    'title_ar'   => $internshipTitlesAr[$idx],
                    'title_en'   => $internshipTitlesEn[$idx],
                    'duration'   => $internshipDurations[$idx],
                    'status'     => 'open',
                ]);
                $internships[] = $internship;
            }
        }

        // User Internships (10)
        foreach ($candidateUsers as $i => $user) {
            for ($j = 0; $j < 2; $j++) {
                UserInternship::create([
                    'user_id'       => $user->id,
                    'internship_id' => $internships[($i * 2 + $j) % count($internships)]->id,
                    'progress'      => rand(0, 100),
                ]);
            }
        }

        // ── 12. Tasks (10) ─────────────────────────────────────
        $tasks = [];
        for ($i = 0; $i < 10; $i++) {
            $task = Task::create([
                'title_ar' => $taskTitlesAr[$i % 5] . ' ' . ($i + 1),
                'title_en' => $taskTitlesEn[$i % 5] . ' ' . ($i + 1),
                'payout'   => rand(50, 500),
                'time'     => $taskTimes[$i % 5],
                'rating'   => rand(35, 50) / 10,
                'status'   => 'open',
            ]);
            $tasks[] = $task;
        }

        // Task Assignments (10)
        foreach ($candidateUsers as $i => $user) {
            for ($j = 0; $j < 2; $j++) {
                TaskAssignment::create([
                    'user_id' => $user->id,
                    'task_id' => $tasks[($i * 2 + $j) % count($tasks)]->id,
                    'status'  => $taskStatuses[rand(0, 2)],
                    'earned'  => rand(0, 500),
                ]);
            }
        }

        // ── 13. Activity Logs (10) ───────────────────────────────
        foreach ($candidateUsers as $i => $user) {
            for ($j = 0; $j < 2; $j++) {
                $idx = ($i * 2 + $j) % 5;
                ActivityLog::create([
                    'user_id'    => $user->id,
                    'message_ar' => $activitiesAr[$idx],
                    'message_en' => $activitiesEn[$idx],
                ]);
            }
        }

        // ── 14. Fraud Alerts (10) ──────────────────────────────
        foreach (range(0, 9) as $i) {
            FraudAlert::create([
                'type'             => $fraudTypes[$i % 5],
                'user_label'       => 'User #' . rand(1000, 9999),
                'severity'         => $severities[rand(0, 2)],
                'reported_user_id' => $candidateUsers[$i % 5]->id,
            ]);
        }

        $this->command->info('✅ Seeded successfully!');
        $this->command->info('   Users: ' . User::count());
        $this->command->info('   Challenges: ' . Challenge::count());
        $this->command->info('   Jobs: ' . CompanyJob::count());
        $this->command->info('   Submissions: ' . Submission::count());
        $this->command->info('   Skills: ' . Skill::count());
    }
}
