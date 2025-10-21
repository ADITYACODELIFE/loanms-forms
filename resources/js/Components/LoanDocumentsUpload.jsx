import React, { useState } from "react";
import axios from "axios";

const LoanDocumentsUpload = ({ loanFormData, setLoanFormData, onUploadComplete }) => {
  const [isdaSignedFile, setIsdaSignedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadMessage, setUploadMessage] = useState("");

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB limit

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 🔍 Validate file type
    if (file.type !== "application/pdf") {
      setUploadMessage("❌ Only PDF files are allowed.");
      e.target.value = "";
      return;
    }

    // 🔍 Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setUploadMessage("❌ File size exceeds 2MB limit.");
      e.target.value = "";
      return;
    }

    setUploadMessage("");
    setIsdaSignedFile(file);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!isdaSignedFile) {
      setUploadMessage("⚠️ Please select a PDF file to upload.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("isda_signed_upload", isdaSignedFile);
      formData.append("loan_application_id", loanFormData.id || ""); // optional if backend requires it
      formData.append("customer_id", loanFormData.customer_id || ""); // optional if backend requires it
      formData.append("company_id", loanFormData.company_id || ""); // optional if backend requires it

      const res = await axios.post("/api/document-upload", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (p) => {
          const percent = Math.round((p.loaded * 100) / p.total);
          setUploadProgress(percent);
        },
      });

      setUploadMessage("✅ Document uploaded successfully!");
      setLoanFormData({
        ...loanFormData,
        isda_signed_upload_path: res.data.file_path,
      });

      if (onUploadComplete) onUploadComplete();
    } catch (error) {
      console.error(error);
      setUploadMessage("❌ Error uploading file. Try again.");
    }
  };

  return (
    <div className="card mt-3">
      <div className="card-body">
        <h5 className="mb-3">📄 Upload Documents</h5>
        <form onSubmit={handleUpload}>
          <div className="mb-3">
            <label className="form-label">Upload Signed ISDA Document (PDF only)</label>
            <input
              type="file"
              accept=".pdf"
              className="form-control"
              onChange={handleFileChange}
            />
          </div>

          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="progress mb-2">
              <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                style={{ width: `${uploadProgress}%` }}
              >
                {uploadProgress}%
              </div>
            </div>
          )}

          {uploadMessage && <div className="text-info small">{uploadMessage}</div>}

          <button type="submit" className="btn btn-primary mt-3">
            Upload Document
          </button>
        </form>

        {loanFormData.isda_signed_upload_path && (
          <div className="mt-3">
            <a
              href={loanFormData.isda_signed_upload_path}
              target="_blank"
              rel="noopener noreferrer"
            >
              📎 View Uploaded Document
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanDocumentsUpload;
