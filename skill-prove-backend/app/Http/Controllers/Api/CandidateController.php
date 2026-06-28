<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class CandidateController extends Controller
{
    public function dashboard(Request $request)
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
            'internships_count'  => $user->userInternships()->count(),
            'recent_activities'  => $user->activityLogs()->latest()->take(5)->get(),
        ]);
    }

    public function profile(Request $request)
    {
        return response()->json(
            $request->user()->load([
                'candidateProfile',
                'educations',
                'certifications',
                'portfolioItems',
                'skills',
                'userSkills.skill',
            ])
        );
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();
        $profile = $user->candidateProfile()->firstOrCreate([]);

        $validated = $request->validate([
            'bio'           => 'nullable|string',
            'skills'          => 'sometimes|array',
            'github_url'      => 'nullable|url|max:255',
            'linkedin_url'    => 'nullable|url|max:255',
            'portfolio_url'   => 'nullable|url|max:255',
            'avatar_url'      => 'nullable|string|max:255',
        ]);

        $profile->update($validated);

        // Calculate profile completion
        $completion = $this->calculateCompletion($profile, $user);
        $user->update(['profile_completion' => $completion]);

        return response()->json($profile->fresh());
    }

    public function submissions(Request $request)
    {
        return response()->json(
            $request->user()->submissions()
                ->with(['challenge:id,title_ar,title_en', 'links'])
                ->latest()
                ->paginate(10)
        );
    }

    public function applications(Request $request)
    {
        return response()->json(
            $request->user()->candidateJobApplications()
                ->with('job.company:id,name,avatar')
                ->latest()
                ->paginate(10)
        );
    }

    public function interviews(Request $request)
    {
        return response()->json(
            $request->user()->interviewSessions()->latest()->paginate(10)
        );
    }

    public function myTasks(Request $request)
    {
        return response()->json(
            $request->user()->taskAssignments()
                ->with('task')
                ->latest()
                ->paginate(10)
        );
    }

    public function myInternships(Request $request)
    {
        return response()->json(
            $request->user()->userInternships()
                ->with('internship.company:id,name')
                ->latest()
                ->paginate(10)
        );
    }

    private function calculateCompletion($profile, $user): int
    {
        $fields = [
            $profile->bio,
            $profile->github_url,
            $profile->linkedin_url,
            $user->educations->isNotEmpty(),
            $user->certifications->isNotEmpty(),
            $user->portfolioItems->isNotEmpty(),
            $user->skills->isNotEmpty(),
        ];
        $filled = collect($fields)->filter()->count();
        return (int) round(($filled / count($fields)) * 100);
    }
}
