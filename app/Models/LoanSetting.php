<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LoanSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'min_loan_amount',
        'max_loan_amount',
        'interest_rate',
        'amt_multiplier',
        'min_loan_term_months',
        'min_repay_percentage_for_next_loan',
    ];
}
