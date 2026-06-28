<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ChallengeController;
use App\Http\Controllers\Api\SubmissionController;
use App\Http\Controllers\Api\JobController;
use App\Http\Controllers\Api\VideoController;
use App\Http\Controllers\Api\CandidateController;
use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\InternshipController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\LeaderboardController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\EducationController;
use App\Http\Controllers\Api\CertificationController;
use App\Http\Controllers\Api\PortfolioItemController;
use App\Http\Controllers\Api\SkillController;
use App\Http\Controllers\Api\InterviewSessionController;
use App\Http\Controllers\Api\ActivityLogController;
use App\Http\Controllers\Api\SearchController;
use App\Http\Controllers\Api\DashboardController;
use Illuminate\Support\Facades\Route;

// ── Public ───────────────────────────────────────────
Route::prefix('auth')->group(function () {
    Route::post('/register/candidate', [AuthController::class, 'registerCandidate']);
    Route::post('/register/company',   [AuthController::class, 'registerCompany']);
    Route::post('/login',              [AuthController::class, 'login']);
    Route::post('/forgot-password',    [AuthController::class, 'forgotPassword']);
});

Route::get('/challenges',     [ChallengeController::class, 'index']);
Route::get('/challenges/{challenge}', [ChallengeController::class, 'show']);
Route::get('/jobs',           [JobController::class, 'index']);
Route::get('/jobs/{job}',     [JobController::class, 'show']);
Route::get('/leaderboard',    [LeaderboardController::class, 'index']);
Route::get('/internships',    [InternshipController::class, 'index']);
Route::get('/search',         [SearchController::class, 'global']);

// ── Protected ─────────────────────────────────────────
Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me',      [AuthController::class, 'me']);
    Route::put('/auth/me',      [AuthController::class, 'updateMe']);
    Route::post('/auth/avatar', [AuthController::class, 'uploadAvatar']);

    // Challenges
    Route::post('/challenges',              [ChallengeController::class, 'store']);
    Route::put('/challenges/{challenge}',   [ChallengeController::class, 'update']);
    Route::delete('/challenges/{challenge}',[ChallengeController::class, 'destroy']);
    Route::post('/challenges/{challenge}/submit', [SubmissionController::class, 'store']);
    Route::get('/challenges/{challenge}/submissions', [SubmissionController::class, 'index']);
    Route::get('/challenges/{challenge}/rubrics', [ChallengeController::class, 'rubrics']);

    // Submissions (Candidate)
    Route::get('/submissions', [SubmissionController::class, 'mySubmissions']);
    Route::get('/submissions/{submission}', [SubmissionController::class, 'show']);
    Route::put('/submissions/{submission}', [SubmissionController::class, 'update']);
    Route::post('/submissions/{submission}/links', [SubmissionController::class, 'addLink']);
    Route::delete('/submissions/{submission}/links/{link}', [SubmissionController::class, 'removeLink']);

    // Jobs
    Route::post('/jobs',             [JobController::class, 'store']);
    Route::put('/jobs/{job}',        [JobController::class, 'update']);
    Route::delete('/jobs/{job}',     [JobController::class, 'destroy']);
    Route::post('/jobs/{job}/apply', [JobController::class, 'apply']);
    Route::get('/jobs/{job}/applicants', [JobController::class, 'applicants']);
    Route::patch('/jobs/{job}/applicants/{application}', [JobController::class, 'updateApplicationStatus']);

    // Videos
    Route::apiResource('videos', VideoController::class);

    // Candidate Profile & Portfolio
    Route::prefix('candidate')->group(function () {
        Route::get('/dashboard',    [CandidateController::class, 'dashboard']);
        Route::get('/profile',      [CandidateController::class, 'profile']);
        Route::put('/profile',      [CandidateController::class, 'updateProfile']);
        Route::get('/submissions',  [CandidateController::class, 'submissions']);
        Route::get('/applications', [CandidateController::class, 'applications']);
        Route::get('/interviews',   [CandidateController::class, 'interviews']);
        Route::get('/tasks',        [CandidateController::class, 'myTasks']);
        Route::get('/internships',  [CandidateController::class, 'myInternships']);
    });

    // Candidate Details (Educations, Certifications, Portfolio, Skills)
    Route::apiResource('educations', EducationController::class);
    Route::apiResource('certifications', CertificationController::class);
    Route::apiResource('portfolio-items', PortfolioItemController::class);
    Route::get('/skills', [SkillController::class, 'index']);
    Route::post('/skills/attach', [SkillController::class, 'attach']);
    Route::put('/skills/{userSkill}', [SkillController::class, 'updateUserSkill']);
    Route::delete('/skills/{userSkill}', [SkillController::class, 'detach']);

    // Interview Sessions
    Route::apiResource('interviews', InterviewSessionController::class);
    Route::post('/interviews/{interview}/answer', [InterviewSessionController::class, 'submitAnswer']);
    Route::post('/interviews/{interview}/feedback', [InterviewSessionController::class, 'submitAiFeedback']);

    // Company
    Route::prefix('company')->group(function () {
        Route::get('/profile',    [CompanyController::class, 'profile']);
        Route::put('/profile',    [CompanyController::class, 'updateProfile']);
        Route::get('/talent',     [CompanyController::class, 'talent']);
        Route::get('/evaluate',   [CompanyController::class, 'evaluate']);
        Route::get('/challenges', [CompanyController::class, 'myChallenges']);
        Route::get('/jobs',       [CompanyController::class, 'myJobs']);
        Route::get('/submissions', [CompanyController::class, 'mySubmissions']);
    });

    // Internships
    Route::post('/internships',                [InternshipController::class, 'store']);
    Route::get('/internships/{internship}',    [InternshipController::class, 'show']);
    Route::put('/internships/{internship}',    [InternshipController::class, 'update']);
    Route::delete('/internships/{internship}', [InternshipController::class, 'destroy']);
    Route::post('/internships/{internship}/enroll', [InternshipController::class, 'enroll']);
    Route::patch('/internships/{internship}/progress', [InternshipController::class, 'updateProgress']);

    // Tasks
    Route::apiResource('tasks', TaskController::class);
    Route::patch('/tasks/{task}/complete', [TaskController::class, 'complete']);
    Route::post('/tasks/{task}/assign', [TaskController::class, 'assign']);

    // Activity Logs
    Route::get('/activity-logs', [ActivityLogController::class, 'index']);

    // Dashboard
    Route::get('/dashboard/admin', [DashboardController::class, 'adminStats']);
    Route::get('/dashboard/candidate', [DashboardController::class, 'candidateDashboard']);
    Route::get('/dashboard/company', [DashboardController::class, 'companyDashboard']);

    // Admin
    Route::prefix('admin')->group(function () {
        Route::get('/users',               [AdminController::class, 'users']);
        Route::get('/fraud',               [AdminController::class, 'fraud']);
        Route::post('/fraud',              [AdminController::class, 'storeFraud']);
        Route::patch('/users/{user}/suspend', [AdminController::class, 'suspend']);
        Route::patch('/users/{user}/unsuspend', [AdminController::class, 'unsuspend']);
        Route::get('/submissions/pending-ai', [AdminController::class, 'pendingAi']);
        Route::get('/submissions/in-review', [AdminController::class, 'inReview']);
        Route::patch('/submissions/{submission}/review', [AdminController::class, 'assignReviewer']);
        Route::patch('/submissions/{submission}/score', [AdminController::class, 'scoreSubmission']);
    });
});
