<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\CandidateJobApplication;
class CompanyController extends Controller
{
    public function profile(Request $request)
    {
        return response()->json(
            $request->user()->load(['companyProfile', 'companyJobs'])
        );
    }

    public function updateProfile(Request $request)
    {
        $profile = $request->user()->companyProfile()->firstOrCreate([]);

        $validated = $request->validate([
            'company_name' => 'sometimes|string|max:255',
            'industry'     => 'nullable|string|max:255',
            'description'  => 'nullable|string',
            'website'      => 'nullable|url|max:255',
            'logo_url'     => 'nullable|string|max:255',
            'location'     => 'nullable|string|max:255',
        ]);

        $profile->update($validated);
        return response()->json($profile->fresh());
    }

    public function talent(Request $request)
    {
        $query = User::where('role', 'candidate')
            ->with('candidateProfile', 'skills')
            ->where('readiness', '>=', 70);

        if ($request->filled('skill')) {
            $query->whereHas('skills', function ($q) use ($request) {
                $q->where('name', $request->skill);
            });
        }

        if ($request->filled('badge')) {
            $query->where('badge_tier', $request->badge);
        }

        return response()->json($query->latest()->paginate(20));
    }

    public function evaluate(Request $request)
    {
        $this->authorize('evaluate', User::class);

        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'readiness' => 'required|integer|min:0|max:100',
        ]);

        $user = User::findOrFail($validated['user_id']);
        $user->update(['readiness' => $validated['readiness']]);

        // Update badge tier based on readiness
        $badge = match (true) {
            $validated['readiness'] >= 90 => 'Diamond',
            $validated['readiness'] >= 75 => 'Platinum',
            $validated['readiness'] >= 60 => 'Gold',
            $validated['readiness'] >= 40 => 'Silver',
            default => 'Bronze',
        };
        $user->update(['badge_tier' => $badge]);

        return response()->json($user->only(['id', 'name', 'readiness', 'badge_tier']));
    }

    public function myChallenges(Request $request)
    {
        return response()->json(
            $request->user()->challenges()
                ->withCount('submissions')
                ->latest()
                ->paginate(10)
        );
    }

    public function myJobs(Request $request)
    {
        return response()->json(
            $request->user()->companyJobs()
                ->withCount('applications')
                ->latest()
                ->paginate(10)
        );
    }

    public function mySubmissions(Request $request)
    {
        $challengeIds = $request->user()->challenges()->pluck('id');

        return response()->json(
            \App\Models\Submission::whereIn('challenge_id', $challengeIds)
                ->with(['user:id,name,avatar', 'challenge:id,title_ar,title_en'])
                ->latest()
                ->paginate(15)
        );
    }
}
