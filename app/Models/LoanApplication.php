<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Customer;
use App\Models\OrganisationMaster;
use App\Models\InstallmentDetail;
use App\Models\DocumentUpload;

class LoanApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id','customer_id','organisation_id',
        'loan_type','purpose','other_purpose_text',
        'loan_amount_applied','loan_amount_approved',
        'tenure_fortnight','emi_amount','interest_rate',
        'processing_fee','grace_period_days','disbursement_date',
        'bank_name','bank_branch','bank_account_no',
        'status','approved_by','approved_date',
        'higher_approved_by','higher_approved_date',
        'isda_generated_path','isda_signed_upload_path','remarks'
    ];

    public function customer(){ return $this->belongsTo(Customer::class); }
    public function organisation(){ return $this->belongsTo(OrganisationMaster::class); }
    public function installments(){ return $this->hasMany(InstallmentDetail::class,'loan_id'); }
    public function documents(){ return $this->hasMany(DocumentUpload::class,'loan_id'); }
}
