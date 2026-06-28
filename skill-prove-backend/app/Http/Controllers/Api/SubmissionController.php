<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Challenge;
use App\Models\Submission;
use Illuminate\Http\Request;

class SubmissionController extends Controller
{
    public function index(Request $request, Challenge $challenge)
    {
        $this->authorize('viewSubmissions', $challenge);

        $query = $challenge->submissions()
            ->with(['user:id,name,avatar', 'reviewer:id,name'])
            ->latest();

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        return response()->json($query->paginate(15));
    }

    public function mySubmissions(Request $request)
    {
        return response()->json(
            $request->user()->submissions()
                ->with(['challenge:id,title_ar,title_en', 'links'])
                ->latest()
                ->paginate(10)
        );
    }

    public function store(Request $request, Challenge $challenge)
    {
        $validated = $request->validate([
            'type'  => 'in:regular,final',
            'links' => 'sometimes|array',
            'links.*.url'  => 'required|url',
            'links.*.type' => 'in:github,demo,video,document,other',
        ]);

        $existing = Submission::where('user_id', $request->user()->id)
            ->where('challenge_id', $challenge->id)
            ->first();

        if ($existing) {
            return response()->json(['message' => 'لقد قدمت لهذا التحدي مسبقاً'], 400);
        }

        $submission = Submission::create([
            'user_id'      => $request->user()->id,
            'challenge_id' => $challenge->id,
            'type'         => $validated['type'] ?? 'regular',
            'status'       => 'pending_ai',
            'submitted_at' => now(),
        ]);

        if (! empty($validated['links'])) {
            $submission->links()->createMany($validated['links']);
        }

        return response()->json($submission->load('links'), 201);
    }

    public function show(Submission $submission)
    {
        $this->authorize('view', $submission);

        return response()->json(
            $submission->load([
                'challenge',
                'user:id,name,avatar',
                'reviewer:id,name',
                'links',
                'scores',
                'rubricScores.scorer:id,name',
            ])
        );
    }

    public function update(Request $request, Submission $submission)
    {
        $this->authorize('update', $submission);

        $validated = $request->validate([
            'status'              => 'in:pending_ai,ai_done,in_review,accepted,rejected',
            'feedback_ar'         => 'nullable|string',
            'feedback_en'         => 'nullable|string',
            'ai_score'            => 'nullable|numeric|min:0|max:10',
            'ai_feedback_ar'      => 'nullable|string',
            'ai_feedback_en'      => 'nullable|string',
            'accepted_to_showcase' => 'boolean',
        ]);

        if ($request->has('ai_score') && ! $submission->ai_evaluated_at) {
            $validated['ai_evaluated_at'] = now();
        }

        $submission->update($validated);
        return response()->json($submission->fresh());
    }

    public function addLink(Request $request, Submission $submission)
    {
        $this->authorize('update', $submission);

        $validated = $request->validate([
            'url'  => 'required|url',
            'type' => 'in:github,demo,video,document,other',
        ]);

        $link = $submission->links()->create($validated);
        return response()->json($link, 201);
    }

    public function removeLink(Submission $submission, $linkId)
    {
        $this->authorize('update', $submission);
        $submission->links()->where('id', $linkId)->delete();
        return response()->json(['message' => 'تم الحذف']);
    }
}
