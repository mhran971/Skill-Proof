<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class LeaderboardController extends Controller
{
    public function index(Request $request)
    {
        $query = User::where('role', 'candidate')
            ->with('candidateProfile')
            ->orderByDesc('reputation')
            ->orderByDesc('readiness');

        if ($request->filled('skill')) {
            $query->whereHas('skills', function ($q) use ($request) {
                $q->where('name', $request->skill);
            });
        }

        if ($request->filled('badge')) {
            $query->where('badge_tier', $request->badge);
        }

        return response()->json($query->paginate(20));
    }
}
