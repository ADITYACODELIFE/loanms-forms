<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LoanSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('loan_settings')->insert([
            'min_loan_amount' => 200,
            'max_loan_amount' => 20000,
            'interest_rate' => 2.35,
            'amt_multiplier' => 50,
            'min_loan_term_months' => 5,
            'min_repay_percentage_for_next_loan' => 80,
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
