import { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";

export default function CustomerEligibilityForm({ customerId }) {
  const [formData, setFormData] = useState({
    customer_id: customerId || 0,
    gross_salary_amt: "",
    temp_allowances_amt: "",
    overtime_amt: "",
    tax_amt: "",
    superannuation_amt: "",
    current_net_pay_amt: "",
    bank_2_amt: "",
    total_other_deductions_amt: "",
    current_fincorp_deduction_amt: "",
    other_deductions_amt: "",
    proposed_pva_amt: "",
  });

  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckEligibility = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/check-eligibility", formData);
      setResult(res.data); // expect backend to return calculated values
      setMessage("✅ Eligibility calculated successfully!");
    } catch (error) {
      console.error(error);
      setMessage("❌ Error calculating eligibility.");
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Customer Eligibility Check</h3>

      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.startsWith("✅")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <Form onSubmit={handleCheckEligibility}>
        <Row className="g-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Gross Salary (PGK)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="gross_salary_amt"
                value={formData.gross_salary_amt}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Temporary Allowances (PGK)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="temp_allowances_amt"
                value={formData.temp_allowances_amt}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Overtime (PGK)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="overtime_amt"
                value={formData.overtime_amt}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label>Tax Amount (PGK)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="tax_amt"
                value={formData.tax_amt}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Superannuation (PGK)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="superannuation_amt"
                value={formData.superannuation_amt}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Other Deductions (PGK)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="other_deductions_amt"
                value={formData.other_deductions_amt}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label>Current Fincorp Deduction (PGK)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="current_fincorp_deduction_amt"
                value={formData.current_fincorp_deduction_amt}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Proposed PVA (PGK)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="proposed_pva_amt"
                value={formData.proposed_pva_amt}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="mt-4 text-end">
          <Button variant="primary" type="submit">
            Check Eligibility
          </Button>
        </div>
      </Form>

      {result && (
        <div className="mt-6 border-t pt-4">
          <h4 className="text-md font-semibold mb-2">Eligibility Result</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>
              <strong>Total Net Salary:</strong> PGK {result.total_net_salary_amt}
            </li>
            <li>
              <strong>50% Net:</strong> PGK {result.net_50_percent_amt}
            </li>
            <li>
              <strong>50% Available:</strong> PGK {result.net_50_percent_available_amt}
            </li>
            <li>
              <strong>Max Allowable PVA:</strong> PGK {result.max_allowable_pva_amt}
            </li>
            <li>
              <strong>Eligibility:</strong>{" "}
              {result.is_eligible_for_loan ? (
                <span className="text-green-600 font-medium">Eligible ✅</span>
              ) : (
                <span className="text-red-600 font-medium">Not Eligible ❌</span>
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
