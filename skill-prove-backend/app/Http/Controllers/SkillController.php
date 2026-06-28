<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use App\Models\UserSkill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    public function index()
    {
        return response()->json(Skill::all());
    }

    public function attach(Request $request)
    {
        $validated = $request->validate([
            'skill_id' => 'required|exists:skills,id',
            'level'    => 'in:Beginner,Intermediate,Advanced,Expert',
            'score'    => 'integer|min:0|max:100',
        ]);

        $userSkill = $request->user()->userSkills()->updateOrCreate(
            ['skill_id' => $validated['skill_id']],
            [
                'level' => $validated['level'] ?? 'Beginner',
                'score' => $validated['score'] ?? 0,
            ]
        );

        return response()->json($userSkill->load('skill'));
    }

    public function updateUserSkill(Request $request, UserSkill $userSkill)
    {
        $this->authorize('update', $userSkill);

        $validated = $request->validate([
            'level' => 'in:Beginner,Intermediate,Advanced,Expert',
            'score' => 'integer|min:0|max:100',
        ]);

        $userSkill->update($validated);
        return response()->json($userSkill->load('skill'));
    }

    public function detach(UserSkill $userSkill)
    {
        $this->authorize('delete', $userSkill);
        $userSkill->delete();
        return response()->json(['message' => 'تم إزالة المهارة']);
    }
}
