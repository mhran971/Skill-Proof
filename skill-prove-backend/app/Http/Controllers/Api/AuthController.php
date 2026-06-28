<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\CandidateProfile;
use App\Models\CompanyProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Storage;

class AuthController extends Controller
{
    public function registerCandidate(Request $request)
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role'     => 'candidate',
        ]);

        CandidateProfile::create(['user_id' => $user->id]);

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'user'  => $user->load('candidateProfile'),
            'token' => $token,
        ], 201);
    }

    public function registerCompany(Request $request)
    {
        $validated = $request->validate([
            'name'         => 'required|string|max:255',
            'email'        => 'required|string|email|max:255|unique:users',
            'password'     => 'required|string|min:8|confirmed',
            'company_name' => 'required|string|max:255',
        ]);

        $user = User::create([
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role'     => 'company',
        ]);

        CompanyProfile::create([
            'user_id'      => $user->id,
            'company_name' => $validated['company_name'],
        ]);

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'user'  => $user->load('companyProfile'),
            'token' => $token,
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['بيانات الاعتماد غير صحيحة.'],
            ]);
        }

        if ($user->is_suspended) {
            return response()->json(['message' => 'الحساب معلق'], 403);
        }

        $token = $user->createToken('auth-token')->plainTextToken;

        $load = $user->role === 'candidate' ? 'candidateProfile' : 'companyProfile';

        return response()->json([
            'user'  => $user->load($load),
            'token' => $token,
        ]);
    }

    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);
        // Implementation with Password::sendResetLink
        return response()->json(['message' => 'تم إرسال رابط إعادة التعيين']);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'تم تسجيل الخروج']);
    }

    public function me(Request $request)
    {
        $user = $request->user();
        $load = match ($user->role) {
            'candidate' => ['candidateProfile', 'educations', 'certifications', 'portfolioItems', 'skills'],
            'company'   => ['companyProfile', 'companyJobs'],
            default     => [],
        };
        return response()->json($user->load($load));
    }

    public function updateMe(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name'     => 'sometimes|string|max:255',
            'avatar'   => 'sometimes|string|max:255',
            'location' => 'sometimes|string|max:255',
            'title'    => 'sometimes|string|max:255',
        ]);

        $user->update($validated);
        return response()->json($user);
    }

    public function uploadAvatar(Request $request)
    {
        $request->validate(['avatar' => 'required|image|max:2048']);
        $path = $request->file('avatar')->store('avatars', 'public');
        $request->user()->update(['avatar' => Storage::url($path)]);
        return response()->json(['avatar' => Storage::url($path)]);
    }
}
