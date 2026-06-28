<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Challenge;
use App\Models\CompanyJob;
use App\Models\Submission;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function adminStats()
    {
        return response()->json([
            'users_count'       => User::count(),
            'candidates_count'  => User::where('role', 'candidate')->count(),
            'companies_count'   => User::where('role', 'company')->count(),
            'challenges_count'  => Challenge::count(),
            'jobs_count'        => CompanyJob::count(),
            'submissions_count' => Submission::count(),
            'pending_ai'        => Submission::where('status', 'pending_ai')->count(),
            'in_review'         => Submission::where('status', 'in_review')->count(),
            'recent_users'      => User::latest()->take(5)->get(['id', 'name', 'email', 'role', 'created_at']),
            'recent_submissions' => Submission::with('user:id,name', 'challenge:id,title_en')
                ->latest()->take(5)->get(),
        ]);
    }

    public function candidateDashboard(Request $request)
    {
        $user = $request->user();
        $profile = $user->candidateProfile;

        return response()->json([
            'profile_completion' => $user->profile_completion,
            'readiness'          => $user->readiness,
            'badge_tier'         => $user->badge_tier,
            'reputation'         => $user->reputation,
            'xp_points'          => $profile?->xp_points ?? 0,
            'level'              => $profile?->level ?? 1,
            'submissions_count'  => $user->submissions()->count(),
            'applications_count' => $user->candidateJobApplications()->count(),
            'interviews_count'   => $user->interviewSessions()->count(),
            'tasks_count'        => $user->taskAssignments()->count(),
            'recent_activities'  => $user->activityLogs()->latest()->take(5)->get(),
        ]);
    }

    public function companyDashboard(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'jobs_count'          => $user->companyJobs()->count(),
            'total_applicants'    => $user->companyJobs()->sum('applicants_count'),
            'challenges_count'    => $user->challenges()->count(),
            'submissions_count'   => Submission::whereIn('challenge_id', $user->challenges()->pluck('id'))->count(),
            'recent_applications' => \App\Models\CandidateJobApplication::whereIn('job_id', $user->companyJobs()->pluck('id'))
                ->with('user:id,name,avatar')
                ->latest()
                ->take(5)
                ->get(),
        ]);
    }
}
