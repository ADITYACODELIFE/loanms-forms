import { useState } from 'react';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Create({ auth }) {
    const [formData, setFormData] = useState({
        borrower_name: '',
        amount: '',
        interest_rate: '',
        term_months: '',
        purpose: '',
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            await axios.post('/api/loans', formData);
            setMessage('✅ Loan application submitted successfully!');
            setFormData({
                borrower_name: '',
                amount: '',
                interest_rate: '',
                term_months: '',
                purpose: '',
            });
        } catch (error) {
            console.error(error);
            setMessage('❌ Failed to submit. Please check your input.');
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">New Loan Application</h2>}
        >
            <Head title="New Loan Application" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {message && (
                                <div className={`mb-4 p-3 rounded ${message.startsWith('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {message}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 font-medium">Borrower Name</label>
                                    <input
                                        type="text"
                                        name="borrower_name"
                                        value={formData.borrower_name}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium">Amount</label>
                                    <input
                                        type="number"
                                        name="amount"
                                        value={formData.amount}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-700 font-medium">Interest Rate (%)</label>
                                        <input
                                            type="number"
                                            name="interest_rate"
                                            value={formData.interest_rate}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-medium">Term (months)</label>
                                        <input
                                            type="number"
                                            name="term_months"
                                            value={formData.term_months}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium">Purpose</label>
                                    <textarea
                                        name="purpose"
                                        value={formData.purpose}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    ></textarea>
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                    >
                                        Submit Application
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
