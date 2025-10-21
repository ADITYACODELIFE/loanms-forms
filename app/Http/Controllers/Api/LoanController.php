<?php

namespace App\Http\Controllers\Api;

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
            'company_id' => 'required|exists:company_master,id',
            'organisation_id' => 'required|exists:organisation_master,id',
            'customer_id' => 'required|exists:customers,id',

            'loan_type' => 'required|in:New,Consolidation,Rollover,Top-Up',
            'purpose' => 'nullable|in:Tuition,Living,Medical,Appliance,Car,Travel,HomeImprovement,Other',
            'other_purpose_text' => 'nullable|string|max:255',

            'loan_amount_applied' => 'required|numeric|min:0',
            'loan_amount_approved' => 'nullable|numeric|min:0',
            'tenure_fortnight' => 'required|integer|min:1',
            'emi_amount' => 'nullable|numeric|min:0',
            'interest_rate' => 'nullable|numeric|min:0|max:100',
            'processing_fee' => 'nullable|numeric|min:0',
            'grace_period_days' => 'nullable|integer|min:0',

            'disbursement_date' => 'nullable|date',
            'bank_name' => 'nullable|string|max:100',
            'bank_branch' => 'nullable|string|max:100',
            'bank_account_no' => 'nullable|string|max:50',

            'status' => 'nullable|in:Pending,Verified,Approved,HigherApproval,Disbursed,Closed',

            'approved_by' => 'nullable|string|max:100',
            'approved_date' => 'nullable|date',
            'higher_approved_by' => 'nullable|string|max:100',
            'higher_approved_date' => 'nullable|date',

            'remarks' => 'nullable|string',

            // PDF upload validation
            'isda_signed_upload' => 'nullable|file|mimes:pdf|max:2048', // 2 MB max
        ]);

        try {
            // Handle file upload (PDF)
            if ($request->hasFile('isda_signed_upload')) {
                $file = $request->file('isda_signed_upload');
                $filename = time() . '_' . $file->getClientOriginalName();
                $path = $file->storeAs('uploads/isda_signed_docs', $filename, 'public');
                $validated['isda_signed_upload_path'] = '/storage/' . $path;
            }

            // Default values for unset fields
            $validated['status'] = $validated['status'] ?? 'Pending';
            $validated['approved_date'] = $validated['approved_date'] ?? null;
            $validated['higher_approved_date'] = $validated['higher_approved_date'] ?? null;

            // Create loan application
            $loan = \App\Models\LoanApplication::create($validated);

            return response()->json([
                'message' => 'Loan application created successfully.',
                'loan' => $loan,
            ], 201);
        } catch (\Exception $e) {
            \Log::error('LoanApplication store error: ' . $e->getMessage());

            return response()->json([
                'error' => 'Unable to create loan application.',
                'details' => $e->getMessage(),
            ], 500);
        }
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
