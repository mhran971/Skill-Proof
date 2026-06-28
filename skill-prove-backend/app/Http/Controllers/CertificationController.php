<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Certification;
use Illuminate\Http\Request;

class CertificationController extends Controller
{
    public function index(Request $request)
    {
        return response()->json($request->user()->certifications);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'           => 'required|string|max:255',
            'issuer'         => 'required|string|max:255',
            'year'           => 'required|integer|min:1900|max:' . (date('Y') + 1),
            'credential_url' => 'nullable|url|max:255',
        ]);

        $cert = $request->user()->certifications()->create($validated);
        return response()->json($cert, 201);
    }

    public function show(Certification $certification)
    {
        $this->authorize('view', $certification);
        return response()->json($certification);
    }

    public function update(Request $request, Certification $certification)
    {
        $this->authorize('update', $certification);

        $validated = $request->validate([
            'name'           => 'sometimes|string|max:255',
            'issuer'         => 'sometimes|string|max:255',
            'year'           => 'sometimes|integer|min:1900|max:' . (date('Y') + 1),
            'credential_url' => 'nullable|url|max:255',
        ]);

        $certification->update($validated);
        return response()->json($certification);
    }

    public function destroy(Certification $certification)
    {
        $this->authorize('delete', $certification);
        $certification->delete();
        return response()->json(['message' => 'تم الحذف']);
    }
}
