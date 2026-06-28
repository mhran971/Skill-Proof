<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\InterviewSession;
use Illuminate\Http\Request;

class InterviewSessionController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(
            $request->user()->interviewSessions()->latest()->paginate(10)
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'questions' => 'required|array|min:1',
            'questions.*.ar' => 'required|string',
            'questions.*.en' => 'required|string',
        ]);

        $session = InterviewSession::create([
            'user_id'   => $request->user()->id,
            'questions' => $validated['questions'],
            'status'    => 'in_progress',
        ]);

        return response()->json($session, 201);
    }

    public function show(InterviewSession $interview)
    {
        $this->authorize('view', $interview);
        return response()->json($interview);
    }

    public function update(Request $request, InterviewSession $interview)
    {
        $this->authorize('update', $interview);

        $validated = $request->validate([
            'status' => 'in:in_progress,completed',
        ]);

        $interview->update($validated);
        return response()->json($interview);
    }

    public function destroy(InterviewSession $interview)
    {
        $this->authorize('delete', $interview);
        $interview->delete();
        return response()->json(['message' => 'تم الحذف']);
    }

    public function submitAnswer(Request $request, InterviewSession $interview)
    {
        $this->authorize('update', $interview);

        $validated = $request->validate([
            'index' => 'required|integer|min:0',
            'text'  => 'required|string',
        ]);

        $answers = $interview->answers ?? [];
        $answers[] = [
            'index'       => $validated['index'],
            'text'        => $validated['text'],
            'recorded_at' => now()->toDateTimeString(),
        ];

        $interview->update(['answers' => $answers]);
        return response()->json($interview);
    }

    public function submitAiFeedback(Request $request, InterviewSession $interview)
    {
        $this->authorize('update', $interview);

        $validated = $request->validate([
            'feedback' => 'required|array',
            'feedback.*.index'       => 'required|integer',
            'feedback.*.feedback_ar' => 'required|string',
            'feedback.*.feedback_en' => 'required|string',
            'feedback.*.score'       => 'required|numeric|min:0|max:10',
            'overall_score'          => 'required|numeric|min:0|max:10',
        ]);

        $interview->update([
            'ai_feedback'    => $validated['feedback'],
            'overall_score'  => $validated['overall_score'],
            'status'         => 'completed',
            'completed_at'   => now(),
        ]);

        return response()->json($interview);
    }
}
