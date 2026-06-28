<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PortfolioItem;
use Illuminate\Http\Request;

class PortfolioItemController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(
            $request->user()->portfolioItems()->orderBy('sort_order')->get()
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'stack'       => 'nullable|string|max:255',
            'url'         => 'nullable|url|max:255',
            'thumb_url'   => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'sort_order'  => 'sometimes|integer|min:0|max:255',
        ]);

        $item = $request->user()->portfolioItems()->create($validated);
        return response()->json($item, 201);
    }

    public function show(PortfolioItem $portfolioItem)
    {
        $this->authorize('view', $portfolioItem);
        return response()->json($portfolioItem);
    }

    public function update(Request $request, PortfolioItem $portfolioItem)
    {
        $this->authorize('update', $portfolioItem);

        $validated = $request->validate([
            'name'        => 'sometimes|string|max:255',
            'stack'       => 'nullable|string|max:255',
            'url'         => 'nullable|url|max:255',
            'thumb_url'   => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'sort_order'  => 'sometimes|integer|min:0|max:255',
        ]);

        $portfolioItem->update($validated);
        return response()->json($portfolioItem);
    }

    public function destroy(PortfolioItem $portfolioItem)
    {
        $this->authorize('delete', $portfolioItem);
        $portfolioItem->delete();
        return response()->json(['message' => 'تم الحذف']);
    }
}
