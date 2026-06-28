<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CompanyJob;
use App\Models\CandidateJobApplication;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public function index(Request $request)
    {
        $query = CompanyJob::with('company:id,name,avatar,location')
            ->where('status', 'open');

        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        if ($request->filled('location')) {
            $query->where('location', 'like', '%' . $request->location . '%');
        }

        if ($request->filled('skills')) {
            $skills = $request->skills;
            $query->whereJsonContains('skills_required', $skills);
        }

        return response()->json($query->latest()->paginate(12));
    }

    public function show(CompanyJob $job)
    {
        return response()->json(
            $job->load(['company', 'applications.user:id,name,avatar,title'])
        );
    }

    public function store(Request $request)
    {
        $this->authorize('create', CompanyJob::class);

        $validated = $request->validate([
            'title'           => 'required|string|max:255',
            'location'        => 'required|string|max:255',
            'salary_min'      => 'nullable|integer|min:0',
            'salary_max'      => 'nullable|integer|min:0|gte:salary_min',
            'description'     => 'nullable|string',
            'type'            => 'in:full-time,part-time,remote,hybrid',
            'skills_required' => 'sometimes|array',
            'deadline'        => 'nullable|date|after:today',
        ]);

        $validated['company_id'] = $request->user()->id;
        $job = CompanyJob::create($validated);
        return response()->json($job, 201);
    }

    public function update(Request $request, CompanyJob $job)
    {
        $this->authorize('update', $job);

        $validated = $request->validate([
            'title'           => 'sometimes|string|max:255',
            'location'        => 'sometimes|string|max:255',
            'salary_min'      => 'nullable|integer|min:0',
            'salary_max'      => 'nullable|integer|min:0|gte:salary_min',
            'description'     => 'nullable|string',
            'type'            => 'in:full-time,part-time,remote,hybrid',
            'skills_required' => 'sometimes|array',
            'deadline'        => 'nullable|date',
            'status'          => 'in:open,reviewing,closed',
        ]);

        $job->update($validated);
        return response()->json($job->fresh());
    }

    public function destroy(CompanyJob $job)
    {
        $this->authorize('delete', $job);
        $job->delete();
        return response()->json(['message' => 'تم حذف الوظيفة']);
    }

    public function apply(Request $request, CompanyJob $job)
    {
        if ($job->status !== 'open') {
            return response()->json(['message' => 'الوظيفة مغلقة'], 400);
        }

        $existing = CandidateJobApplication::where('user_id', $request->user()->id)
            ->where('job_id', $job->id)
            ->exists();

        if ($existing) {
            return response()->json(['message' => 'لقد تقدمت لهذه الوظيفة مسبقاً'], 400);
        }

        $validated = $request->validate([
            'cover_note' => 'nullable|string',
        ]);

        $application = CandidateJobApplication::create([
            'user_id'    => $request->user()->id,
            'job_id'     => $job->id,
            'status'     => 'applied',
            'cover_note' => $validated['cover_note'] ?? null,
        ]);

        $job->increment('applicants_count');

        return response()->json($application->load('job'), 201);
    }

    public function applicants(Request $request, CompanyJob $job)
    {
        $this->authorize('viewApplicants', $job);

        return response()->json(
            $job->applications()
                ->with('user:id,name,avatar,title,location')
                ->latest()
                ->paginate(15)
        );
    }

    public function updateApplicationStatus(Request $request, CompanyJob $job, CandidateJobApplication $application)
    {
        $this->authorize('updateStatus', $application);

        $validated = $request->validate([
            'status' => 'in:applied,reviewed,shortlisted,rejected,hired',
        ]);

        $application->update(['status' => $validated['status']]);
        return response()->json($application->fresh());
    }
}
