<?php

namespace App\Http\Controllers;

use App\Models\Domain;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DomainController extends Controller
{

    public function show(Request $request)
    {

       $query = Domain::where('user_id', Auth::id());

    // Apply search filter if search query exists
    if ($request->has('search')) {
        $search = $request->get('search');
        $query->where('name', 'like', "%{$search}%");
    }

    // Paginate with 10 items per page
    $domains = $query->latest()->paginate(10);

    // Append the search query to the pagination links
    $domains->appends($request->only('search'));

        // Get summary statistics
        $stats = [
            'total' => Domain::where('user_id', Auth::user()->id)->count(),
            'active' => Domain::where('user_id', Auth::user()->id)
                ->where('status', 'active')->count(),
            'expiring_soon' => Domain::where('user_id', Auth::user()->id)
                ->where('expiry_date', '<=', now()->addDays(30))
                ->count(),
            'for_sale' => Domain::where('user_id', Auth::user()->id)
                ->where('for_sale', true)->count(),
        ];

        // Calculate total portfolio value
        $totalValue = Domain::where('user_id', Auth::user()->id)
            ->sum('current_value');

        return Inertia::render('dashboard', [
            'domains' => $domains,
            'stats' => $stats,
            'totalValue' => $totalValue
        ]);
    }
    public function display()
    {
        return Inertia::render('auth/create-domain', []);
    }

    public function store(Request $request)
    {
        // Validate the incoming request data
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:domains,name',
            'registrar' => 'nullable|string|max:255',
            'registration_date' => 'required|date',
            'expiry_date' => 'required|date|after:registration_date',
            'auto_renew' => 'boolean',
            'purchase_price' => 'required|numeric|min:0',
            'current_value' => 'nullable|numeric|min:0',
            'for_sale' => 'boolean',
            'status' => 'required|in:active,expired,pending,sold',
            'notes' => 'nullable|string',
        ]);

        // Create the domain record
        $domain = Domain::create([
            'name' => $validated['name'],
            'registrar' => $validated['registrar'],
            'registration_date' => $validated['registration_date'],
            'expiry_date' => $validated['expiry_date'],
            'auto_renew' => $validated['auto_renew'] ?? false,
            'purchase_price' => $validated['purchase_price'],
            'current_value' => $validated['current_value'],
            // 'asking_price' => $validated['asking_price'],
            'for_sale' => $validated['for_sale'] ?? false,
            'status' => $validated['status'],
            'notes' => $validated['notes'],
            'user_id' => Auth::user()->id, // Assign to currently authenticated user
        ]);

        // Redirect with success message
        return redirect()->route('dashboard')
            ->with('success', 'Domain created successfully!');
    }

    public function affichage($id)
    {
        $domain  = Domain::where('user_id', Auth::user()->id)->where('id', $id)->get();
        return Inertia::render('Edit', [
            'domain' => $domain[0],
        ]);
    }
    public function update(Request $request, Domain $domain)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|',
            'registrar' => 'nullable|string|max:255',
            'registration_date' => 'required|date',
            'expiry_date' => 'required|date|after:registration_date',
            'auto_renew' => 'boolean',
            'purchase_price' => 'required|numeric|min:0',
            'current_value' => 'nullable|numeric|min:0',
            'for_sale' => 'boolean',
            'status' => 'required|in:active,expired,pending,sold',
            'notes' => 'nullable|string',
        ]);
        $domain->update($validated);
        return redirect()->route('dashboard')
            ->with('success', 'Domain updated successfully');
    }
    public function destroy(Domain $domain)
    {
        $domain->delete();
        return redirect()->route('dashboard')
            ->with('success', 'Domain deleted successfully');
    }
}
