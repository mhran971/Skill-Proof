<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\FraudAlert;
use App\Models\Submission;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if ($request->user()->role !== 'admin') {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
            return $next($request);
        });
    }

    public function users(Request $request)
    {
        $query = User::with(['candidateProfile', 'companyProfile']);

        if ($request->filled('role')) {
            $query->where('role', $request->role);
        }

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%');
        }

        return response()->json($query->latest()->paginate(20));
    }

    public function suspend(Request $request, User $user)
    {
        $user->update(['is_suspended' => true]);
        return response()->json(['message' => 'تم تعليق المستخدم', 'user' => $user]);
    }

    public function unsuspend(Request $request, User $user)
    {
        $user->update(['is_suspended' => false]);
        return response()->json(['message' => 'تم إلغاء تعليق المستخدم', 'user' => $user]);
    }

    public function fraud()
    {
        return response()->json(
            FraudAlert::with('reportedUser:id,name,email')
                ->latest()
                ->paginate(20)
        );
    }

    public function storeFraud(Request $request)
    {
        $validated = $request->validate([
            'type'             => 'required|string|max:255',
            'user_label'       => 'required|string|max:255',
            'severity'         => 'in:low,medium,high',
            'reported_user_id' => 'nullable|exists:users,id',
        ]);

        $alert = FraudAlert::create($validated);
        return response()->json($alert, 201);
    }

    public function pendingAi()
    {
        return response()->json(
            Submission::where('status', 'pending_ai')
                ->with(['user:id,name', 'challenge:id,title_en'])
                ->latest()
                ->paginate(20)
        );
    }

    public function inReview()
    {
        return response()->json(
            Submission::where('status', 'in_review')
                ->with(['user:id,name', 'challenge:id,title_en', 'reviewer:id,name'])
                ->latest()
                ->paginate(20)
        );
    }

    public function assignReviewer(Request $request, Submission $submission)
    {
        $validated = $request->validate([
            'reviewer_id' => 'required|exists:users,id',
        ]);

        $submission->update([
            'reviewer_id' => $validated['reviewer_id'],
            'status'      => 'in_review',
        ]);

        return response()->json($submission->fresh('reviewer'));
    }

    public function scoreSubmission(Request $request, Submission $submission)
    {
        $validated = $request->validate([
            'score'    => 'required|integer|min:0|max:100',
            'feedback' => 'nullable|string',
        ]);

        $submission->scores()->create([
            'score'     => $validated['score'],
            'feedback'  => $validated['feedback'],
            'scored_by' => $request->user()->id,
        ]);

        $submission->update(['status' => 'accepted']);

        // Update user reputation
        $user = $submission->user;
        $user->increment('reputation', $validated['score']);

        return response()->json($submission->fresh('scores'));
    }
}
