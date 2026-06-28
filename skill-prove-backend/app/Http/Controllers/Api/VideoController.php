<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Video;
use Illuminate\Http\Request;

class VideoController extends Controller
{
    public function index()
    {
        return response()->json(
            Video::with('user:id,name,avatar')->latest()->paginate(12)
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title_ar'   => 'required|string|max:255',
            'title_en'   => 'required|string|max:255',
            'duration'   => 'required|string|max:10',
            'thumb_url'  => 'nullable|string|max:255',
            'video_url'  => 'nullable|string|max:255',
            'ai_summary' => 'nullable|string',
        ]);

        $video = $request->user()->videos()->create($validated);
        return response()->json($video, 201);
    }

    public function show(Video $video)
    {
        $video->increment('views');
        return response()->json($video->load('user:id,name,avatar'));
    }

    public function update(Request $request, Video $video)
    {
        $this->authorize('update', $video);

        $validated = $request->validate([
            'title_ar'   => 'sometimes|string|max:255',
            'title_en'   => 'sometimes|string|max:255',
            'duration'   => 'sometimes|string|max:10',
            'thumb_url'  => 'nullable|string|max:255',
            'video_url'  => 'nullable|string|max:255',
            'ai_summary' => 'nullable|string',
        ]);

        $video->update($validated);
        return response()->json($video);
    }

    public function destroy(Video $video)
    {
        $this->authorize('delete', $video);
        $video->delete();
        return response()->json(['message' => 'تم الحذف']);
    }
}
