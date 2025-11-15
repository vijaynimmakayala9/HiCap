// src/components/CertificateDetails.jsx

import React from "react";

const WebsiteCertificate = () => {
  const certificateImage = "/assets/certificates/iso-27001-certificate.png"; // update path

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "0px auto",
        padding: "20px",
        fontFamily: "Roboto, sans-serif",
      }}
    >
      {/* HEADING */}
      <h1
        style={{
          fontSize: "34px",
          fontWeight: "700",
          color: "#7A0A1A", // Meroon
          textAlign: "center",
          marginBottom: "40px",
          letterSpacing: "1px",
        }}
      >
        Certification Details
      </h1>

      {/* CARD */}
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          padding: "30px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
          borderTop: "6px solid #7A0A1A",
        }}
      >
        

        {/* CONTENT */}
        <div style={{ lineHeight: "1.8", fontSize: "17px", color: "#333" }}>

          {/* Company */}
          <p
            style={{
              fontSize: "22px",
              fontWeight: "700",
              color: "#7A0A1A",
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            HICAP EDTECH PRIVATE LIMITED
          </p>

          {/* Certificate No */}
          <p>
            <strong style={{ color: "#7A0A1A" }}>Certificate Code:</strong>{" "}
            QCC/94AF/1125
          </p>

          {/* Issue Date */}
          <p>
            <strong style={{ color: "#7A0A1A" }}>Issued On:</strong>{" "}
            03 November 2025
          </p>

          {/* Verification */}
          <p style={{ marginTop: "18px" }}>
            <strong style={{ color: "#7A0A1A" }}>Verify Certificate:</strong>{" "}
            <a
              href="https://qccertification.com/Client.aspx"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#7A0A1A",
                fontWeight: "600",
                textDecoration: "underline",
              }}
            >
              https://qccertification.com/Client.aspx
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WebsiteCertificate;
