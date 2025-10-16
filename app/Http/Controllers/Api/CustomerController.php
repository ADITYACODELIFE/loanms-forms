<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Customer;

class CustomerController extends Controller
{
    public function customer_list()
    {
        // Fetch customers from the database
        $customers = \App\Models\Customer::all();

        // Return the customers as a JSON response
        return response()->json($customers);
    }
    //function to save new customer for new loan
    public function store(Request $request)
    {
        // Validate incoming request data
        $validated = $request->validate([
            'company_id' => 'required|integer|exists:company_master,id',
            'organisation_id' => 'required|integer|exists:organisation_master,id',
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'email' => 'nullable|email|max:100',
            'gender' => 'nullable|in:Male,Female,Other',
            'dob' => 'nullable|date',
            'marital_status' => 'nullable|in:Single,Married,Divorced,Widowed',
            'no_of_dependents' => 'nullable|integer|min:0',
            'phone' => 'nullable|string|max:20',
            'present_address' => 'nullable|string',
            'permanent_address' => 'nullable|string',
            'employee_no' => 'nullable|string|max:50',
            'designation' => 'nullable|string|max:100',
            'employment_type' => 'nullable|in:Permanent,Contract',
            'date_joined' => 'nullable|date',
            'monthly_salary' => 'nullable|numeric',
            'work_location' => 'nullable|string|max:100',
            'status' => 'nullable|in:Active,Inactive',
        ]);
        $validated['user_id'] = $request->user()->id;
        //check if email, phone, employee_no already exists
        $existingCustomer = Customer::where(function ($query) use ($validated) {
            if (isset($validated['email'])) {
                $query->where('email', $validated['email']);
            }
            if (isset($validated['phone'])) {
                $query->orWhere('phone', $validated['phone']);
            }
            if (isset($validated['employee_no'])) {
                $query->orWhere('employee_no', $validated['employee_no']);
            }
        })->first();
        if ($existingCustomer) {
            return response()->json([
                'message' => 'Customer with the same email, phone, or employee number already exists.',
            ], 409); // Conflict status code
        }

        // Create a new customer record
        $customer = Customer::create($validated);
        // Return the newly created customer as a JSON response
        // return response()->json($customer, 201);
        return response()->json([
            'message' => 'Customer info saved temporarily.',
            'temp_customer_id' => $customer->id,
        ], 201);
    }
}
