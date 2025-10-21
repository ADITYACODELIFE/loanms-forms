import { use, useEffect, useState } from 'react';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import "bootstrap/dist/css/bootstrap.min.css";
import { Tab, Tabs } from "react-bootstrap";
import useBeforeUnload from '@/Components/useBeforeUnload';
import LoanDocumentsUpload from '@/Components/LoanDocumentsUpload';

export default function Create({ auth }) {
    const [isFormDirty, setIsFormDirty] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [organisations, setOrganisations] = useState([]);
    // const [tempCusFormData, settempCusFormData] = useState({
    const [formData, setFormData] = useState({
        company_id: "",
        organisation_id: "",
        first_name: "",
        last_name: "",
        gender: "",
        dob: "",
        marital_status: "",
        no_of_dependents: "",
        phone: "",
        email: "",
        present_address: "",
        permanent_address: "",
        employee_no: "",
        designation: "",
        employment_type: "",
        date_joined: "",
        monthly_salary: "",
        work_location: "",
    });
    const [loanFormData, setLoanFormData] = useState({
        company_id: "",
        customer_id: "",
        organisation_id: "",
        loan_type: "New",
        purpose: "",
        other_purpose_text: "",
        loan_amount_applied: "",
        tenure_fortnight: "",
        interest_rate: "",
        processing_fee: "",
        bank_name: "",
        bank_branch: "",
        bank_account_no: "",
        remarks: "",
    });
    const [loanDocumentFormData, setLoanDocumentFormData] = useState({
        loan_id: "",
        customer_id: "",
        doc_type: "",
        file_name: "New",
        file_path: "",
        uploaded_by: "",
        uploaded_on: "",
        verified_by: "",
        verified_on: "",
        verification_status: "",
        notes: ""
    });
    const [message, setMessage] = useState('');
    const [step, setStep] = useState(1);
    const [tempCustomerId, setTempCustomerId] = useState(null);
    const isEmpty = (obj) => Object.keys(obj).length === 0;
    useBeforeUnload(isFormDirty, formData);
    // useBeforeUnload(isFormDirty, async function (e) {
    //     // Custom action before unload, e.g., save draft
    //     console.log("User is trying to leave with unsaved changes.");
    //     e.preventDefault();
    //     try {
    //         const res = await axios.post('/api/temp-customer', formData, { withCredentials: true });
    //         setTempCustomerId(res.data.temp_customer_id);
    //         console.log("saved customer temp data:",res.data);
    //         setLoanFormData({
    //             customer_id: res.data.temp_customer_id,
    //             company_id: "",
    //             organisation_id: "",
    //             loan_type: "New",
    //             purpose: "",
    //             other_purpose_text: "",
    //             loan_amount_applied: "",
    //             tenure_fortnight: "",
    //             interest_rate: "",
    //             processing_fee: "",
    //             bank_name: "",
    //             bank_branch: "",
    //             bank_account_no: "",
    //             remarks: "",
    //         });
    //         console.log("set loan form customer_id to temp id:",res.data.temp_customer_id);
    //         console.log("set loan form customer_id setTempCustomerId:",tempCustomerId);
    //         setMessage('✅ Please fill out the loan application form.');
    //         setStep(2); // Move to next tab
    //     } catch (error) {
    //         console.error(error);
    //         setMessage('❌ Please correct the errors before proceeding.');
    //     }
    // });
    // useEffect(() => {
    //     // Fetch Customers from the API
    //     fetch('/api/customer-list')
    //         .then((res)=>res.json())
    //         .then(data => {
    //             setCustomers(data);
    //         })
    //         .catch(error => {
    //             console.error('There was an error fetching the customers!', error);
    //         });
    // }, []);
    const fetchCustomers = async () => {
        try {
            const res = await axios.get('/api/customer-list', { withCredentials: true });
            setCustomers(res.data);
        } catch (error) {
            console.error('There was an error fetching the customers!', error);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);
    useEffect(() => {
        // Fetch Companies from the API
        fetch('/api/company-list')
            .then((res)=>res.json())
            .then(data => {
                setCompanies(data);
            })
            .catch(error => {
                console.error('There was an error fetching the customers!', error);
            });
    }, []);
    useEffect(() => {
        // Fetch Organisations from the API
        fetch('/api/organisation-list')
            .then((res)=>res.json())
            .then(data => {
                setOrganisations(data);
            })
            .catch(error => {
                console.error('There was an error fetching the customers!', error);
            });
    }, []);
    // const handleChange = (e) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    // };
    const handleChange = (e) => {
        setIsFormDirty(false);
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const loanHandleChange = (e) => {
        const { name, value } = e.target;
        setLoanFormData((prev) => ({ ...prev, [name]: value }));
    };
    const loanDocumentHandleChange = (e) => {
        const { name, value } = e.target;
        setLoanDocumentFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsFormDirty(true);
        setMessage('');

        try {
            const res = await axios.post('/api/loans', loanFormData);
            setMessage('✅ Loan application data saved successfully!');
            const savedLoan = res.data.loan;
            setLoanFormData({
                id: savedLoan.id,
                company_id: savedLoan.company_id,
                customer_id: savedLoan.customer_id,
                organisation_id: savedLoan.organisation_id,
                loan_type: savedLoan.loan_type,
                purpose: savedLoan.purpose || "",
                other_purpose_text: savedLoan.other_purpose_text || "",
                loan_amount_applied: savedLoan.loan_amount_applied || "",
                tenure_fortnight: savedLoan.tenure_fortnight || "",
                interest_rate: savedLoan.interest_rate || "",
                processing_fee: savedLoan.processing_fee || "",
                bank_name: savedLoan.bank_name || "",
                bank_branch: savedLoan.bank_branch || "",
                bank_account_no: savedLoan.bank_account_no || "",
                remarks: savedLoan.remarks || "",
            });
            setFormData({
                company_id: "",
                organisation_id: "",
                first_name: "",
                last_name: "",
                gender: "",
                dob: "",
                marital_status: "",
                no_of_dependents: "",
                phone: "",
                email: "",
                present_address: "",
                permanent_address: "",
                employee_no: "",
                designation: "",
                employment_type: "",
                date_joined: "",
                monthly_salary: "",
                work_location: "",
            });
            setLoanDocumentFormData({
                loan_id: savedLoan.id,
                customer_id: savedLoan.customer_id,
                doc_type: "",
                file_name: "",
                file_path: "",
                uploaded_by: "",
                uploaded_on: "",
                verified_by: "",
                verified_on: "",
                verification_status: "Pending",
                notes: ""
            });
            setStep(3); // Move to next tab
        } catch (error) {
            console.error(error);
            setMessage('❌ Failed to save. Please check your input.');
        }
    };
    const handleDocumentSubmit = async (e) => {
        e.preventDefault();
        setIsFormDirty(true);
        setMessage('');

        try {
            await axios.post('/api/loans-document', loanFormData);
            setMessage('✅ Loan application submitted successfully!');
            setLoanDocumentFormData({
                loan_id: "",
                customer_id: "",
                doc_type: "",
                file_name: "New",
                file_path: "",
                uploaded_by: "",
                uploaded_on: "",
                verified_by: "",
                verified_on: "",
                verification_status: "",
                notes: ""
            });
        } catch (error) {
            console.error(error);
            setMessage('❌ Failed to submit. Please check your input.');
        }
    };
    // const [message, setMessage] = useState('Fill out the form below to create a new customer.');
    const handleNext = async (e) => {
        e.preventDefault();
        setIsFormDirty(false);
        try {
            const res = await axios.post('/api/save-new-customer-for-new-loan', formData, { withCredentials: true });
            await fetchCustomers();
            const cusId = res.data.temp_customer_id;
            setTempCustomerId(res.data.temp_customer_id);
            // const cleanData = Object.fromEntries(
            //     Object.entries({'customer_id': tempCustomerId}).map(([k, v]) => [k, v ?? ""])
            // );
            // setLoanFormData(cleanData);
            console.log("saved customer temp data:",res.data);
            setLoanFormData(prev => ({
                ...prev,
                customer_id: cusId,
                company_id: "",
                organisation_id: "",
                loan_type: "New",
                purpose: "",
                other_purpose_text: "",
                loan_amount_applied: "",
                tenure_fortnight: "",
                interest_rate: "",
                processing_fee: "",
                bank_name: "",
                bank_branch: "",
                bank_account_no: "",
                remarks: "",
            }));
            console.log("set loan form customer_id to temp id:",res.data.temp_customer_id);
            console.log("set loan form customer_id setTempCustomerId:",tempCustomerId);
            setMessage('✅ Please fill out the loan application form.');
            setStep(2); // Move to next tab
        } catch (error) {
            console.error(error);
            setMessage('❌ Please correct the errors before proceeding.');
        }
    };
    useEffect(()=>{
        axios.get("/api/fetch-loan-temp-customer",{withCredentials:true})

        // .then((res)=>{
        //     if (res.data) {
        //         setFormData(res.data);
        //         console.log("Loaded saved customer:",res.data);
        //     }
        // }).catch((err)=>console.error("Error loading temp customer:",err));

        .then((res) => {
            if(isEmpty(res.data)){
                setMessage('ℹ️ No saved customer data found. Please fill out the form.')
            } else {
                setMessage('✅ Loaded saved customer data. You can continue editing.');
                const cleanData = Object.fromEntries(
                    Object.entries(res.data).map(([k, v]) => [k, v ?? ""])
                );
                setFormData(cleanData);
                console.log("Loaded saved customer:",res.data);
                // setMessage('✅ Loaded saved customer.');
            }
        }).catch((err)=>console.error("Error loading temp customer:",err));
    },[]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">New Loan Application</h2>}
        >
            <Head title="New Loan Application" />
            <Alert key="primary" variant="primary">
                Please go through the tabs to complete the loan application.
            </Alert>
            <div className="py-8">
                <div className="max-w-9xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {message && (
                                <div className={`mb-4 p-3 rounded ${
                                    message.startsWith('✅') 
                                        ? 'bg-green-100 text-green-700' 
                                        : message.startsWith('ℹ️') 
                                        ? 'bg-sky-200 text-black-700' 
                                        : 'bg-red-100 text-red-700'
                                    }`
                                }>

                                    {message}
                                </div>
                            )}

                            <div className="tabs">
                                <ul className="flex border-b">
                                    <li className={`px-4 py-2 ${step === 1 ? 'border-b-2 border-indigo-600 font-semibold' : ''}`}>
                                    Customer Info
                                    </li>
                                    <li className={`px-4 py-2 ${step === 2 ? 'border-b-2 border-indigo-600 font-semibold' : ''}`}>
                                    Loan Application
                                    </li>
                                    <li className={`px-4 py-2 ${step === 3 ? 'border-b-2 border-indigo-600 font-semibold' : ''}`}>
                                    Document Upload
                                    </li>
                                </ul>
                            </div>

                                {step === 1 && (
                                <form onSubmit={handleNext}> {/* Customer form here */}
                                    <Row>
                                        <Col>
                                            {/* --- Company & Organisation --- */}
                                            <div>
                                                <label className="block text-gray-700 font-medium">Company</label>
                                                <select
                                                    name="company_id"
                                                    value={formData.company_id || 0}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                                    required
                                                >
                                                    <option value="">-- Select Company --</option>
                                                    {companies.map((company) => (
                                                        <option key={company.id} value={company.id}>
                                                            {company.company_name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-gray-700 font-medium">Organisation</label>
                                                <select
                                                    name="organisation_id"
                                                    value={formData.organisation_id || 0}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                                    required
                                                >
                                                    <option value="">-- Select Organisation --</option>
                                                    {organisations.map((org) => (
                                                        <option key={org.id} value={org.id}>
                                                            {org.organisation_name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* --- Personal Info --- */}
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-gray-700 font-medium">First Name</label>
                                                    <input
                                                        type="text"
                                                        name="first_name"
                                                        value={formData.first_name}
                                                        onChange={handleChange}
                                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-700 font-medium">Last Name</label>
                                                    <input
                                                        type="text"
                                                        name="last_name"
                                                        value={formData.last_name}
                                                        onChange={handleChange}
                                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-3 gap-4">
                                                <div>
                                                    <label className="block text-gray-700 font-medium">Gender</label>
                                                    <select
                                                        name="gender"
                                                        value={formData.gender || ""}
                                                        onChange={handleChange}
                                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                                    >
                                                        <option value="">-- Select --</option>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <label className="block text-gray-700 font-medium">Date of Birth</label>
                                                    <input
                                                        type="date"
                                                        name="dob"
                                                        value={formData.dob}
                                                        onChange={handleChange}
                                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-gray-700 font-medium">Marital Status</label>
                                                    <select
                                                        name="marital_status"
                                                        value={formData.marital_status || ""}
                                                        onChange={handleChange}
                                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                                    >
                                                        <option value="">-- Select --</option>
                                                        <option value="Single">Single</option>
                                                        <option value="Married">Married</option>
                                                        <option value="Divorced">Divorced</option>
                                                        <option value="Widowed">Widowed</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-gray-700 font-medium">Number of Dependents</label>
                                                <input
                                                    type="number"
                                                    name="no_of_dependents"
                                                    value={formData.no_of_dependents}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                                />
                                            </div>

                                            {/* --- Contact Info --- */}
                                            <div>
                                                <label className="block text-gray-700 font-medium">Phone</label>
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-gray-700 font-medium">Email</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                                />
                                            </div>
                                        </Col>

                                        <Col>
                                            <div>
                                                <label className="block text-gray-700 font-medium">Present Address</label>
                                                <textarea
                                                    name="present_address"
                                                    value={formData.present_address}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-gray-700 font-medium">Permanent Address</label>
                                                <textarea
                                                    name="permanent_address"
                                                    value={formData.permanent_address}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                                />
                                            </div>

                                            {/* --- Employment Info --- */}
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-gray-700 font-medium">Employee No</label>
                                                    <input
                                                        type="text"
                                                        name="employee_no"
                                                        value={formData.employee_no}
                                                        onChange={handleChange}
                                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-gray-700 font-medium">Designation</label>
                                                    <input
                                                        type="text"
                                                        name="designation"
                                                        value={formData.designation}
                                                        onChange={handleChange}
                                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-gray-700 font-medium">Employment Type</label>
                                                    <select
                                                        name="employment_type"
                                                        value={formData.employment_type || ""}
                                                        onChange={handleChange}
                                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                                    >
                                                        <option value="">-- Select --</option>
                                                        <option value="Permanent">Permanent</option>
                                                        <option value="Contract">Contract</option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <label className="block text-gray-700 font-medium">Date Joined</label>
                                                    <input
                                                        type="date"
                                                        name="date_joined"
                                                        value={formData.date_joined}
                                                        onChange={handleChange}
                                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-gray-700 font-medium">Monthly Salary (PGK)</label>
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        name="monthly_salary"
                                                        value={formData.monthly_salary}
                                                        onChange={handleChange}
                                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-gray-700 font-medium">Work Location</label>
                                                    <input
                                                        type="text"
                                                        name="work_location"
                                                        value={formData.work_location}
                                                        onChange={handleChange}
                                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                                    />
                                                </div>
                                            </div>

                                            {/* --- Status --- */}
                                            <div>
                                                <label className="block text-gray-700 font-medium">Status</label>
                                                <select
                                                    name="status"
                                                    value={formData.status || ""}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                                >
                                                    <option value="Active">Active</option>
                                                    <option value="Inactive">Inactive</option>
                                                </select>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mt-4 text-end">
                                        <Col>
                                            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 mt-3 rounded">
                                                Next →
                                            </button>
                                        </Col>
                                    </Row>
                                </form>
                                )}
                            {step === 2 && (
                                <form onSubmit={handleSubmit}> {/* Loan application form here */}
                                    <div className="row mb-3">
                                        <div className="col-md-4">
                                            <label className="form-label">Company</label>
                                            <select className="form-select" name="company_id" value={loanFormData.company_id || 0} onChange={loanHandleChange} required>
                                            <option value="">Select Company</option>
                                            {companies.map((c) => (
                                                <option key={c.id} value={c.id}>{c.company_name}</option>
                                            ))}
                                            </select>
                                        </div>

                                        <div className="col-md-4">
                                            <label className="form-label">Customer</label>
                                            <select
                                                className="form-select"
                                                name="customer_id"
                                                value={loanFormData.customer_id || ""}  // ✅ always non-null
                                                onChange={loanHandleChange}
                                                required
                                            >
                                                <option value="">Select Customer</option>
                                                {customers.map((c) => (
                                                    <option key={c.id} value={c.id}>
                                                    {c.first_name} {c.last_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="col-md-4">
                                            <label className="form-label">Organisation</label>
                                            <select className="form-select" name="organisation_id" value={loanFormData.organisation_id || 0} onChange={loanHandleChange}>
                                            <option value="">Select Organisation</option>
                                            {organisations.map((o) => (
                                                <option key={o.id} value={o.id}>{o.organisation_name}</option>
                                            ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-md-4">
                                            <label className="form-label">Loan Type</label>
                                            <select className="form-select" name="loan_type" value={loanFormData.loan_type || ""} onChange={loanHandleChange}>
                                            <option>New</option>
                                            <option>Consolidation</option>
                                            <option>Rollover</option>
                                            <option>Top-Up</option>
                                            </select>
                                        </div>

                                        <div className="col-md-4">
                                            <label className="form-label">Purpose</label>
                                            <select className="form-select" name="purpose" value={loanFormData.purpose || ""} onChange={loanHandleChange}>
                                            <option value="">Select Purpose</option>
                                            <option>Tuition</option>
                                            <option>Living</option>
                                            <option>Medical</option>
                                            <option>Appliance</option>
                                            <option>Car</option>
                                            <option>Travel</option>
                                            <option>HomeImprovement</option>
                                            <option>Other</option>
                                            </select>
                                        </div>

                                        {loanFormData.purpose === "Other" && (
                                            <div className="col-md-4">
                                            <label className="form-label">Other Purpose</label>
                                            <input type="text" className="form-control" name="other_purpose_text" value={loanFormData.other_purpose_text} onChange={loanHandleChange} placeholder="Specify other purpose" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-md-3">
                                            <label className="form-label">Loan Amount Applied</label>
                                            <input type="number" step="0.01" className="form-control" name="loan_amount_applied" value={loanFormData.loan_amount_applied} onChange={loanHandleChange} required />
                                        </div>

                                        <div className="col-md-3">
                                            <label className="form-label">Tenure (Fortnight)</label>
                                            <input type="number" className="form-control" name="tenure_fortnight" value={loanFormData.tenure_fortnight} onChange={loanHandleChange} required />
                                        </div>

                                        <div className="col-md-3">
                                            <label className="form-label">Interest Rate (%)</label>
                                            <input type="number" step="0.01" className="form-control" name="interest_rate" value={loanFormData.interest_rate} onChange={loanHandleChange} />
                                        </div>

                                        <div className="col-md-3">
                                            <label className="form-label">Processing Fee</label>
                                            <input type="number" step="0.01" className="form-control" name="processing_fee" value={loanFormData.processing_fee} onChange={loanHandleChange} />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-md-4">
                                            <label className="form-label">Bank Name</label>
                                            <input type="text" className="form-control" name="bank_name" value={loanFormData.bank_name} onChange={loanHandleChange} />
                                        </div>

                                        <div className="col-md-4">
                                            <label className="form-label">Bank Branch</label>
                                            <input type="text" className="form-control" name="bank_branch" value={loanFormData.bank_branch} onChange={loanHandleChange} />
                                        </div>

                                        <div className="col-md-4">
                                            <label className="form-label">Bank Account No</label>
                                            <input type="text" className="form-control" name="bank_account_no" value={loanFormData.bank_account_no} onChange={loanHandleChange} />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Remarks</label>
                                        <textarea className="form-control" name="remarks" rows="3" value={loanFormData.remarks} onChange={loanHandleChange}></textarea>
                                    </div>
                                    <Row className="mt-4 text-end">
                                        <Col>
                                            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded text-end">
                                                Submit Loan Application
                                            </button>
                                        </Col>
                                    </Row>
                                </form>
                            )}
                            {step === 3 && ( 
                                <LoanDocumentsUpload
                                    loanFormData={loanFormData}
                                    setLoanFormData={setLoanFormData}
                                    onUploadComplete={() => setMessage("✅ All steps completed successfully!")}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
