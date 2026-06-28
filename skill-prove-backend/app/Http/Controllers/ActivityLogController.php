<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ActivityLogController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(
            $request->user()->activityLogs()->latest()->paginate(20)
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'message_ar' => 'required|string|max:255',
            'message_en' => 'required|string|max:255',
        ]);

        $log = $request->user()->activityLogs()->create($validated);
        return response()->json($log, 201);
    }
}
