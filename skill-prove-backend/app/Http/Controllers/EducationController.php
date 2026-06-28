<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Education;
use Illuminate\Http\Request;

class EducationController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(
            $request->user()->educations()->orderBy('sort_order')->get()
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'school'     => 'required|string|max:255',
            'degree'     => 'required|string|max:255',
            'years'      => 'required|string|max:255',
            'gpa'        => 'nullable|string|max:255',
            'sort_order' => 'sometimes|integer|min:0|max:255',
        ]);

        $education = $request->user()->educations()->create($validated);
        return response()->json($education, 201);
    }

    public function show(Education $education)
    {
        $this->authorize('view', $education);
        return response()->json($education);
    }

    public function update(Request $request, Education $education)
    {
        $this->authorize('update', $education);

        $validated = $request->validate([
            'school'     => 'sometimes|string|max:255',
            'degree'     => 'sometimes|string|max:255',
            'years'      => 'sometimes|string|max:255',
            'gpa'        => 'nullable|string|max:255',
            'sort_order' => 'sometimes|integer|min:0|max:255',
        ]);

        $education->update($validated);
        return response()->json($education);
    }

    public function destroy(Education $education)
    {
        $this->authorize('delete', $education);
        $education->delete();
        return response()->json(['message' => 'تم الحذف']);
    }
}
