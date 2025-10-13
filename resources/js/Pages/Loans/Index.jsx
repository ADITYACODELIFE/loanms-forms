// resources/js/Pages/Loans.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index({ auth }) {
    const [loans, setLoans] = useState([]);

    useEffect(() => {
        axios.get('/api/loans')
            .then(res => setLoans(res.data))
            .catch(console.error);
    }, []);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Loans</h2>}
        >
            <Head title="Loan List" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Loan List!</div>
                    </div>
                </div>
                <ul>
                    {/* {loans.map(l => (
                        <li key={l.id}>{l.borrower_name} - {l.amount}</li>
                    ))} */}
                </ul>
            </div>
        </AuthenticatedLayout>
    );
}