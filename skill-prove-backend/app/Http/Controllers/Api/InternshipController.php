<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Internship;
use Illuminate\Http\Request;

class InternshipController extends Controller
{
    public function index()
    {
        return response()->json(
            Internship::with('company:id,name,avatar')
                ->where('status', 'open')
                ->latest()
                ->paginate(12)
        );
    }

    public function store(Request $request)
    {
        $this->authorize('create', Internship::class);

        $validated = $request->validate([
            'title_ar' => 'required|string|max:255',
            'title_en' => 'required|string|max:255',
            'duration' => 'required|string|max:50',
        ]);

        $validated['company_id'] = $request->user()->id;
        $internship = Internship::create($validated);
        return response()->json($internship, 201);
    }

    public function show(Internship $internship)
    {
        return response()->json(
            $internship->load(['company:id,name,avatar', 'users' => function ($q) {
                $q->where('user_id', auth()->id());
            }])
        );
    }

    public function update(Request $request, Internship $internship)
    {
        $this->authorize('update', $internship);

        $validated = $request->validate([
            'title_ar' => 'sometimes|string|max:255',
            'title_en' => 'sometimes|string|max:255',
            'duration' => 'sometimes|string|max:50',
            'status'   => 'in:open,closed',
        ]);

        $internship->update($validated);
        return response()->json($internship);
    }

    public function destroy(Internship $internship)
    {
        $this->authorize('delete', $internship);
        $internship->delete();
        return response()->json(['message' => 'تم الحذف']);
    }

    public function enroll(Request $request, Internship $internship)
    {
        if ($internship->status !== 'open') {
            return response()->json(['message' => 'التدريب مغلق'], 400);
        }

        $existing = $request->user()->userInternships()
            ->where('internship_id', $internship->id)
            ->exists();

        if ($existing) {
            return response()->json(['message' => 'أنت مسجل مسبقاً'], 400);
        }

        $enrollment = $request->user()->userInternships()->create([
            'internship_id' => $internship->id,
            'progress'      => 0,
        ]);

        return response()->json($enrollment->load('internship'), 201);
    }

    public function updateProgress(Request $request, Internship $internship)
    {
        $enrollment = $request->user()->userInternships()
            ->where('internship_id', $internship->id)
            ->firstOrFail();

        $validated = $request->validate([
            'progress' => 'required|integer|min:0|max:100',
        ]);

        $enrollment->update(['progress' => $validated['progress']]);
        return response()->json($enrollment);
    }
}
