import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Card, Container, Row, Col, Alert } from "react-bootstrap";
import { ArrowLeft } from "lucide-react";

export default function LoanApplicationForm({ auth }){

    return(
        <AuthenticatedLayout
        user={auth.user}
        header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            Loan Application Form
            </h2>
        }
        >
        <Head title="Loan Application Form" />
            <Container className="py-10">
                <Row className="mb-3">
                    <Col className="d-flex justify-content-between align-items-center">
                    <Link
                        href={route("dashboard")}
                        className="inline-flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-md text-sm font-medium"
                    >
                        <ArrowLeft size={16} className="me-1" /> Back to Dashboard
                    </Link>
                    </Col>
                </Row>

                <Card className="shadow-sm">
                    <Card.Body>
                        <h3 className="text-center">Design your form here</h3>
                    </Card.Body>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}