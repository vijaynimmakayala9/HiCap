import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto px-5 py-10">
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
              Techsterker (“Company,” “we,” “our,” or “us”), a brand owned and
              operated by <strong>Hicap Edtech Private Limited</strong>,
              respects your privacy and is committed to protecting your personal
              information. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you access our
              website <span className="italic">https://techsterker.com</span>{" "}
              (“Website”) and use our online coaching services. By using our
              Website, you consent to the practices described in this Privacy
              Policy.
            </p>
          </section>

          {/* Information We Collect */}
          <section id="info" className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              1. Information We Collect
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                <strong>(a) Student Personal Information:</strong> Full name,
                email address, phone number, date of birth (if provided),
                address, demographic details, and payment information (processed
                securely; card details not stored).
              </li>
              <li>
                <strong>(b) Login Credentials:</strong> Username and password
                (stored securely using encryption/hashing).
              </li>
              <li>
                <strong>(c) Academic Data:</strong> Course enrollments,
                assignments, results, attendance, progress reports, and
                certifications.
              </li>
              <li>
                <strong>(d) Usage Data:</strong> IP address, browser type,
                device information, OS, referral source, and interaction logs.
              </li>
              <li>
                <strong>(e) Cookies & Tracking Data:</strong> Session cookies,
                preference cookies, analytics cookies (see our Cookie Policy).
              </li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section id="use" className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              2. How We Use Your Information
            </h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-1">
              <li>To create and manage student accounts and login credentials.</li>
              <li>To provide and improve online coaching services.</li>
              <li>To track academic progress and issue certificates.</li>
              <li>To process secure payments and provide receipts.</li>
              <li>To communicate updates, course schedules, and results.</li>
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
            <p className="text-gray-700">
              Depending on your jurisdiction, we rely on:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>
                <strong>Consent:</strong> When you voluntarily provide
                information.
              </li>
              <li>
                <strong>Contractual necessity:</strong> To deliver services you
                enrolled in.
              </li>
              <li>
                <strong>Legitimate interests:</strong> To secure our platform
                and improve learning services.
              </li>
              <li>
                <strong>Legal obligations:</strong> Compliance with the Indian
                DPDP Act, 2023 and frameworks like GDPR.
              </li>
            </ul>
          </section>

          {/* Other Sections */}
          <section id="sharing">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              4. Data Sharing & Disclosure
            </h2>
            <p className="text-gray-700">
              We do not sell personal data. We may share information with:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Tutors/Educators (academic purposes only).</li>
              <li>Service providers (payment, hosting, communication tools).</li>
              <li>Regulatory authorities (if required by law).</li>
              <li>
                Business transfers (mergers, acquisitions, restructuring).
              </li>
            </ul>
          </section>

          <section id="security">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              5. Data Security
            </h2>
            <p className="text-gray-700">
              We employ SSL encryption, secure hosting, encrypted passwords, and
              regular audits to protect your data.
            </p>
          </section>

          <section id="retention">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              6. Data Retention
            </h2>
            <p className="text-gray-700">
              We retain data only as long as necessary for services and
              compliance. Upon account closure, data is deleted or anonymized,
              except where legally required.
            </p>
          </section>

          <section id="rights">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              8. Your Rights
            </h2>
            <p className="text-gray-700">
              Depending on applicable law, you may have rights to access, update
              or delete your data, restrict processing, withdraw consent, and
              lodge complaints with authorities (e.g., DPDP Act 2023, GDPR).
            </p>
          </section>

          <section id="children">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              9. Children’s Privacy
            </h2>
            <p className="text-gray-700">
              Our Website is not intended for children under 18. We do not
              knowingly collect data from minors. Parents may request removal if
              data is mistakenly collected.
            </p>
          </section>

          <section id="third-party">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              10. Third-Party Links
            </h2>
            <p className="text-gray-700">
              Our Website may contain links to external websites. We are not
              responsible for their privacy practices.
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
              For any questions, requests, or concerns, contact:
            </p>
            <p className="text-gray-700">
              <strong>Hicap Edtech Private Limited</strong>
              <br />
              Email:{" "}
              <a
                href="mailto:techsterker@gmail.com"
                className="text-blue-600 hover:underline"
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
