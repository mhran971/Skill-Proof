<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        return response()->json(
            Task::where('status', 'open')->latest()->paginate(12)
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title_ar' => 'required|string|max:255',
            'title_en' => 'required|string|max:255',
            'payout'   => 'required|integer|min:0',
            'time'     => 'required|string|max:20',
            'rating'   => 'sometimes|numeric|min:0|max:5',
        ]);

        $task = Task::create($validated);
        return response()->json($task, 201);
    }

    public function show(Task $task)
    {
        return response()->json($task->load('assignments.user:id,name,avatar'));
    }

    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'title_ar' => 'sometimes|string|max:255',
            'title_en' => 'sometimes|string|max:255',
            'payout'   => 'sometimes|integer|min:0',
            'time'     => 'sometimes|string|max:20',
            'rating'   => 'sometimes|numeric|min:0|max:5',
            'status'   => 'in:open,closed',
        ]);

        $task->update($validated);
        return response()->json($task);
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(['message' => 'تم الحذف']);
    }

    public function assign(Request $request, Task $task)
    {
        if ($task->status !== 'open') {
            return response()->json(['message' => 'المهمة مغلقة'], 400);
        }

        $existing = $request->user()->taskAssignments()
            ->where('task_id', $task->id)
            ->exists();

        if ($existing) {
            return response()->json(['message' => 'أنت مسجل بالفعل'], 400);
        }

        $assignment = $request->user()->taskAssignments()->create([
            'task_id' => $task->id,
            'status'  => 'in_progress',
        ]);

        return response()->json($assignment->load('task'), 201);
    }

    public function complete(Request $request, Task $task)
    {
        $assignment = $request->user()->taskAssignments()
            ->where('task_id', $task->id)
            ->firstOrFail();

        $assignment->update([
            'status' => 'completed',
            'earned' => $task->payout,
        ]);

        // Update candidate XP
        $profile = $request->user()->candidateProfile;
        if ($profile) {
            $profile->increment('xp_points', $task->payout);
            $profile->level = floor($profile->xp_points / 1000) + 1;
            $profile->save();
        }

        return response()->json($assignment->fresh());
    }
}
