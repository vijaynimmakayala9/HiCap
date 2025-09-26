import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto ">
      <div className="bg-white rounded-xl shadow-lg p-8">
        {/* Heading */}
        <header className="mb-8">
          <p className="text-sm text-gray-500">
            Effective Date: 20th September 2025
          </p>
        </header>

        {/* Content */}
        <main className="space-y-8">
          {/* Intro */}
          <section id="intro">
            <p className="text-gray-800 text-base md:text-lg leading-relaxed">
              Techsterker (“Company,” “we,” “our,” or “us”) a brand owned and
              operated by <strong>Hicap Edtech Private Limited</strong> respects
              your privacy and is committed to protecting your personal
              information. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you access our
              website <a
                href="https://techsterker.com"
                target="_blank"
                rel="noopener noreferrer"
                className="italic text-primary text-decoration-underline"
              >
                https://techsterker.com
              </a>{" "}
              ("Techsterker") and use our online coaching services. <br /><br />By using our
              Website, you consent to the practices described in this Privacy
              Policy.
            </p>
          </section>

          {/* Information We Collect */}
          <section id="info" className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              1. Information We Collect
            </h2>
            <p className="text-gray-700">
              We may collect the following categories of personal and
              non-personal information:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 list-unstyled">
              <li>
                <strong>(a) Student Personal Information:</strong>
                <ul className="list-disc list-inside ml-3">
                  <li>Full name, email address, phone number, date of birth (if provided).</li>
                  <li>Address and demographic information (if collected for enrollment).</li>
                  <li>
                    Payment information (processed via secure third-party payment
                    gateways; we do not store card details).
                  </li>
                </ul>
              </li>
              <li>
                <strong>(b) Login Credentials:</strong>
                <ul className="list-disc list-inside ml-5">
                  <li>Username and password for Website access.</li>
                  <li>
                    Passwords are stored in encrypted/hashed format and never in
                    plain text.
                  </li>
                </ul>
              </li>
              <li>
                <strong>(c) Academic Data:</strong> Course enrollments,
                assignments, test results, attendance, progress reports, and
                certifications issued.
              </li>
              <li>
                <strong>(d) Usage Data:</strong> IP address, browser type,
                device information, operating system, referral source, and
                Website interaction logs.
              </li>
              <li>
                <strong>(e) Cookies & Tracking Data:</strong> Session cookies,
                preference cookies, analytics cookies, and other technologies
                (see our <strong>Cookie Policy</strong>).
              </li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section id="use" className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-700">We process collected information for the following purposes:</p>
            <ol className="list-decimal list-inside text-gray-700 space-y-1">
              <li>To create and manage student accounts, including login credentials.</li>
              <li>To provide and improve our online coaching services.</li>
              <li>To track academic progress and generate certificates.</li>
              <li>To process secure payments and provide receipts.</li>
              <li>To communicate important updates, course schedules, and results.</li>
              <li>To secure the Website and prevent unauthorized access.</li>
              <li>To comply with legal and regulatory requirements.</li>
              <li>To perform analytics and improve user experience.</li>
            </ol>
          </section>

          {/* Legal Basis */}
          <section id="legal" className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              3. Legal Basis for Processing
            </h2>
            <p className="text-gray-700">Depending on your jurisdiction, we rely on:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li><strong>Consent:</strong> When you voluntarily provide information.</li>
              <li><strong>Contractual necessity:</strong> To deliver services you enrolled in.</li>
              <li><strong>Legitimate interests:</strong> To secure our platform and improve learning services.</li>
              <li><strong>Legal obligations:</strong> Compliance with applicable laws including the Indian <strong>DPDP Act, 2023</strong> and international frameworks like GDPR.</li>
            </ul>
          </section>

          {/* Data Sharing */}
          <section id="sharing">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              4. Data Sharing & Disclosure
            </h2>
            <p className="text-gray-700">We do not sell personal data. We may share your information with:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Tutors/Educators: Access to academic data necessary for providing coaching.</li>
              <li>Service Providers: Payment processors, cloud hosting providers, learning platforms, and communication tools.</li>
              <li>Regulatory Authorities: If required by law, court order, or government request.</li>
              <li>Business Transfers: If we undergo a merger, acquisition, or restructuring.</li>
            </ul>
            <p className="text-gray-700">All third parties are bound by confidentiality and contractual obligations.</p>
          </section>

          <section id="security">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              5. Data Security
            </h2>
            <p className="text-gray-700">
              We employ industry-standard measures to protect your data,
              including:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>SSL encryption for all data transmitted between your browser and our servers.</li>
              <li>Secure server hosting with access control.</li>
              <li>Encrypted/hashed storage of passwords.</li>
              <li>Regular audits and monitoring to detect unauthorized access.</li>
            </ul>
          </section>

          <section id="retention">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              6. Data Retention
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Student personal and academic data are retained for as long as necessary to deliver services and comply with law.</li>
              <li>Login data is retained until account deletion.</li>
              <li>Upon account closure, data is deleted or anonymized, except where retention is legally required.</li>
            </ul>
          </section>

          <section id="intl">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              7. International Data Transfers
            </h2>
            <p className="text-gray-700">
              If you access our Website from outside India, your data may be transferred and processed in India or other jurisdictions. We ensure appropriate safeguards (e.g., standard contractual clauses for GDPR compliance).
            </p>
          </section>

          <section id="rights">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              8. Your Rights
            </h2>
            <p className="text-gray-700">
              Depending on applicable law, you may have rights to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Access, correct, update, or delete your personal data.</li>
              <li>Request a copy of your academic and personal data.</li>
              <li>Restrict or object to processing.</li>
              <li>Withdraw consent for marketing communications.</li>
              <li>Lodge a complaint with a Data Protection Authority.</li>
            </ul>
            <p className="text-gray-700">
              Indian users may exercise rights under the <strong>DPDP Act, 2023</strong>. To exercise your rights, contact us at <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=techsterker@gmail.com&su=Your%20Enquiry"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                techsterker@gmail.com
              </a>.
            </p>
          </section>

          <section id="children">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              9. Children’s Privacy
            </h2>
            <p className="text-gray-700">
              Our Website is <strong>not intended for users under 18 years of age</strong>. We do
              not knowingly collect personal data from minors.
              Parents/guardians can request removal of any data mistakenly
              collected.
            </p>
          </section>

          <section id="third-party">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              10. Third-Party Links
            </h2>
            <p className="text-gray-700">
              Our Website may include links to external websites. We are not
              responsible for their privacy practices. Please review their
              policies before providing information.
            </p>
          </section>

          <section id="updates">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              11. Updates to This Policy
            </h2>
            <p className="text-gray-700">
              We may update this Privacy Policy periodically. Updated versions
              will be posted here with the effective date.
            </p>
          </section>

          {/* Contact */}
          <section
            id="contact"
            className="bg-blue-50 border border-blue-100 rounded-lg p-5 space-y-2"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              12. Contact Us
            </h2>
            <p className="text-gray-700">
              For any questions, requests, or concerns about this Privacy Policy, contact us:
            </p>
            <p className="text-gray-700">
              <strong>Hicap Edtech Private Limited</strong>
              <br />
              Email:{" "}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=techsterker@gmail.com&su=Your%20Enquiry"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                techsterker@gmail.com
              </a>

              <br />
              Phone:{" "}
              <a
                href="tel:+919000207286"
                className="text-blue-600 hover:underline"
              >
                9000207286
              </a>
              <br />
              Address: D. No. 17-1742502, F. No. 502, Park Vista Apt, Ameenpur,
              Miyapur, Tirumalagiri, Hyderabad – 500049, Telangana
            </p>
          </section>
        </main>

        {/* Footer */}
        <footer className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-gray-500 mt-10 gap-2">
          <div>Last updated: 20th September 2025</div>
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
