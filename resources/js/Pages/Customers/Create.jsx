import { use, useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Customer</h2>}
        >
            <Head title="Create Customer" />
            <div className="py-10">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-7">
                    <div className="bg-white shadow-sm sm:rounded-lg p-6">
                        {/* <CustomerForm /> */}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}