<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LoanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // return Loan::all();
        return inertia('Loans/Index'); // points to resources/js/Pages/Loans/Index.jsx
    }
    public function create()
    {
        // return Loan::all();
        return inertia('Loans/Create'); // points to resources/js/Pages/Loans/Create.jsx
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'borrower_name' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'interest_rate' => 'required|numeric|min:0|max:100',
            'term_months' => 'required|integer|min:1',
            'purpose' => 'nullable|string',
        ]);

        $validated['user_id'] = auth()->id();

        // $loan = Loan::create($validated);

        // return response()->json($loan, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
