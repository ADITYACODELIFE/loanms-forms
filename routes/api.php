<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LoanController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\OrganisationController;
use App\Http\Controllers\Api\LoanTempCustomerController;
use App\Http\Controllers\Api\DocumentUploadController;
use App\Models\LoanTempCustomer;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/loans', [LoanController::class, 'index'])->name('loans.index');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/loans', [LoanController::class, 'index']);
    Route::post('/loans', [LoanController::class, 'store']);
});

Route::middleware('auth:sanctum')->get('/customer-list', [CustomerController::class, 'customer_list']);
Route::middleware('auth:sanctum')->get('/company-list', [CompanyController::class, 'company_list']);
Route::middleware('auth:sanctum')->get('/organisation-list', [OrganisationController::class, 'organisation_list']);

Route::middleware('auth:sanctum')->group(function() {
    Route::post('/temp-customer', [LoanTempCustomerController::class, 'store']);
});
Route::middleware('auth:sanctum')->get('/fetch-loan-temp-customer', [LoanTempCustomerController::class, 'fetch']);
Route::middleware('auth:sanctum')->post('/save-new-customer-for-new-loan', [CustomerController::class, 'store']);

// Route::middleware('auth:sanctum')->post('/upload-loan-documents', [LoanController::class, 'store']);

Route::post('/document-upload', [DocumentUploadController::class, 'store']);
Route::get('/document-upload', [DocumentUploadController::class, 'index']);
Route::get('/document-upload/download/{id}', [DocumentUploadController::class, 'download']);
Route::post('/document-upload/verify/{id}', [DocumentUploadController::class, 'verify']);