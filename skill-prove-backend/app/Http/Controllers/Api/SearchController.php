<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Challenge;
use App\Models\CompanyJob;
use App\Models\User;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function global(Request $request)
    {
        $query = $request->get('q');

        if (strlen($query) < 2) {
            return response()->json(['message' => 'البحث يتطلب حرفين على الأقل'], 422);
        }

        $jobs = CompanyJob::where('status', 'open')
            ->where(function ($q) use ($query) {
                $q->where('title', 'like', "%{$query}%")
                  ->orWhere('description', 'like', "%{$query}%");
            })
            ->with('company:id,name,avatar')
            ->take(5)
            ->get();

        $challenges = Challenge::where('status', 'active')
            ->where(function ($q) use ($query) {
                $q->where('title_ar', 'like', "%{$query}%")
                  ->orWhere('title_en', 'like', "%{$query}%");
            })
            ->with('company:id,name,avatar')
            ->take(5)
            ->get();

        $candidates = User::where('role', 'candidate')
            ->where(function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                  ->orWhere('title', 'like', "%{$query}%");
            })
            ->with('candidateProfile')
            ->take(5)
            ->get();

        return response()->json([
            'jobs'       => $jobs,
            'challenges' => $challenges,
            'candidates' => $candidates,
        ]);
    }
}
