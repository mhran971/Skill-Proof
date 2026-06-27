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

// ── Protected ─────────────────────────────────────────
Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me',      [AuthController::class, 'me']);

    // Challenges
    Route::post('/challenges',              [ChallengeController::class, 'store']);
    Route::put('/challenges/{challenge}',   [ChallengeController::class, 'update']);
    Route::delete('/challenges/{challenge}',[ChallengeController::class, 'destroy']);
    Route::post('/challenges/{challenge}/submit', [SubmissionController::class, 'store']);
    Route::get('/challenges/{challenge}/submissions', [SubmissionController::class, 'index']);

    // Jobs
    Route::post('/jobs',             [JobController::class, 'store']);
    Route::put('/jobs/{job}',        [JobController::class, 'update']);
    Route::delete('/jobs/{job}',     [JobController::class, 'destroy']);
    Route::post('/jobs/{job}/apply', [JobController::class, 'apply']);

    // Videos
    Route::apiResource('videos', VideoController::class);

    // Candidate
    Route::prefix('candidate')->group(function () {
        Route::get('/dashboard',    [CandidateController::class, 'dashboard']);
        Route::get('/profile',      [CandidateController::class, 'profile']);
        Route::put('/profile',      [CandidateController::class, 'updateProfile']);
        Route::get('/submissions',  [CandidateController::class, 'submissions']);
        Route::get('/applications', [CandidateController::class, 'applications']);
    });

    // Company
    Route::prefix('company')->group(function () {
        Route::get('/profile',    [CompanyController::class, 'profile']);
        Route::put('/profile',    [CompanyController::class, 'updateProfile']);
        Route::get('/talent',     [CompanyController::class, 'talent']);
        Route::get('/evaluate',   [CompanyController::class, 'evaluate']);
        Route::get('/challenges', [CompanyController::class, 'myChallenges']);
        Route::get('/jobs',       [CompanyController::class, 'myJobs']);
    });

    // Internships
    Route::post('/internships',                [InternshipController::class, 'store']);
    Route::get('/internships/{internship}',    [InternshipController::class, 'show']);
    Route::put('/internships/{internship}',    [InternshipController::class, 'update']);
    Route::delete('/internships/{internship}', [InternshipController::class, 'destroy']);

    // Tasks
    Route::apiResource('tasks', TaskController::class);
    Route::patch('/tasks/{task}/complete', [TaskController::class, 'complete']);

    // Admin
    Route::prefix('admin')->group(function () {
        Route::get('/users',               [AdminController::class, 'users']);
        Route::get('/fraud',               [AdminController::class, 'fraud']);
        Route::patch('/users/{user}/suspend', [AdminController::class, 'suspend']);
    });
});
