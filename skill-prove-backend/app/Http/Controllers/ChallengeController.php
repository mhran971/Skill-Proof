<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Challenge;
use Illuminate\Http\Request;

class ChallengeController extends Controller
{
    public function index(Request $request)
    {
        $query = Challenge::with('company:id,name,avatar')
            ->where('status', 'active');

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        if ($request->filled('difficulty')) {
            $query->where('difficulty', $request->difficulty);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title_ar', 'like', "%{$search}%")
                  ->orWhere('title_en', 'like', "%{$search}%");
            });
        }

        return response()->json($query->latest()->paginate(12));
    }

    public function show(Challenge $challenge)
    {
        return response()->json(
            $challenge->load([
                'company:id,name,avatar',
                'rubrics',
                'submissions' => function ($q) {
                    $q->where('user_id', auth()->id());
                }
            ])
        );
    }

    public function store(Request $request)
    {
        $this->authorize('create', Challenge::class);

        $validated = $request->validate([
            'title_ar'        => 'required|string|max:255',
            'title_en'        => 'required|string|max:255',
            'description_ar'  => 'nullable|string',
            'description_en'  => 'nullable|string',
            'skills_required' => 'sometimes|array',
            'category'        => 'required|string|max:255',
            'difficulty'      => 'in:Beginner,Intermediate,Advanced',
            'duration'        => 'required|string|max:50',
            'reward'          => 'sometimes|integer|min:0',
        ]);

        $validated['company_id'] = $request->user()->id;
        $challenge = Challenge::create($validated);

        // Default rubrics
        $defaultRubrics = [
            ['rubric_key' => 'code', 'weight' => 5],
            ['rubric_key' => 'problem', 'weight' => 4],
            ['rubric_key' => 'arch', 'weight' => 3],
            ['rubric_key' => 'testing', 'weight' => 4],
            ['rubric_key' => 'docs', 'weight' => 2],
            ['rubric_key' => 'comm', 'weight' => 3],
            ['rubric_key' => 'delivery', 'weight' => 4],
            ['rubric_key' => 'team', 'weight' => 2],
            ['rubric_key' => 'present', 'weight' => 2],
        ];
        $challenge->rubrics()->createMany($defaultRubrics);

        return response()->json($challenge->load('rubrics'), 201);
    }

    public function update(Request $request, Challenge $challenge)
    {
        $this->authorize('update', $challenge);

        $validated = $request->validate([
            'title_ar'        => 'sometimes|string|max:255',
            'title_en'        => 'sometimes|string|max:255',
            'description_ar'  => 'nullable|string',
            'description_en'  => 'nullable|string',
            'skills_required' => 'sometimes|array',
            'category'        => 'sometimes|string|max:255',
            'difficulty'      => 'in:Beginner,Intermediate,Advanced',
            'duration'        => 'sometimes|string|max:50',
            'reward'          => 'sometimes|integer|min:0',
            'status'          => 'in:active,closed',
        ]);

        $challenge->update($validated);
        return response()->json($challenge->fresh());
    }

    public function destroy(Challenge $challenge)
    {
        $this->authorize('delete', $challenge);
        $challenge->delete();
        return response()->json(['message' => 'تم حذف التحدي']);
    }

    public function rubrics(Challenge $challenge)
    {
        return response()->json($challenge->rubrics);
    }
}
