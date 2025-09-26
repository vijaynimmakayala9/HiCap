import React from "react";

const TermsOfUse = () => {
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
              Welcome to Techsterker (“Company,” “we,” “our,” or “us”), a brand
              owned and operated by <strong>Hicap Edtech Private Limited</strong>.
              These Terms of Use (“Terms”) govern your access and use of our website{" "}
              <a
                href="https://techsterker.com"
                target="_blank"
                rel="noopener noreferrer"
                className="italic text-primary text-decoration-underline"
              >
                https://techsterker.com
              </a> (“Techsterker”)
              and our online coaching services {/* (“Services”) */}. By registering,
              accessing, or using our Website, you agree to be bound by these
              Terms. If you do not agree, please do not use our Website or
              Services.
            </p>
          </section>

          {/* 1. Eligibility */}
          <section id="eligibility" className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">1. Eligibility</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>You must be at least 18 years of age to register and use our Services.</li>
              <li>By creating an account, you represent that all information provided is accurate, complete, and truthful.</li>
              <li>If you are under 18, you may only use the Services under parental/guardian supervision.</li>
            </ul>
          </section>

          {/* 2. Account */}
          <section id="account" className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">2. Account Registration & Security</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>To access courses, you must create an account with a username and password.</li>
              <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
              <li>You agree not to share your account or allow unauthorized use.</li>
              <li>Notify us immediately if you suspect unauthorized access.</li>
              <li>We are not liable for any losses due to unauthorized account use.</li>
            </ul>
          </section>

          {/* 3. Privacy */}
          <section id="privacy" className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">3. Student Information & Privacy</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>By using our Services, you consent to the collection and processing of your personal and academic information, as described in our Privacy Policy and Cookie Policy.</li>
              <li>We collect: personal details, login credentials, academic data (course enrollments, results, certifications).</li>
              <li>You agree that we may use your data to provide Services, improve the Website, and comply with law.</li>
            </ul>
          </section>

          {/* 4. Use of Services */}
          <section id="use" className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">4. Use of Services</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Services are provided solely for educational and personal use.</li>
              <li>
                You agree not to:
                <ol className="list-decimal list-inside ml-5 space-y-2">
                  <li>Use the Website for unlawful or harmful purposes.</li>
                  <li>Attempt to gain unauthorized access, copy, or reverse-engineer our platform.</li>
                  <li>Misuse course materials by sharing, selling, or redistributing without authorization.</li>
                </ol>
              </li>
              <li>Any violation may lead to suspension or termination of your account.</li>
            </ul>
          </section>

          {/* 5. Course Content */}
          <section id="content" className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">5. Course Content & Intellectual Property</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>All Website content (courses, study materials, videos, assessments, graphics, and trademarks) are the intellectual property of the Company.</li>
              <li>You are granted a limited, non-transferable, non-exclusive license to access and use materials for personal learning.</li>
              <li>You may not reproduce, distribute, modify, or create derivative works without prior written consent.</li>
            </ul>
          </section>

          {/* 6. Payments */}
          <section id="payments" className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">6. Payments & Refunds</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Fees for courses must be paid in accordance with the pricing displayed on the Website.</li>
              <li>Payments are processed securely through third-party gateways.</li>
              <li>Once enrolled, fees are non-refundable, unless specifically mentioned otherwise in our refund policy.</li>
              <li>In case of failed or duplicate payments, we will assist in resolving issues with the payment provider.</li>
            </ul>
          </section>

          {/* 7. Certificates */}
          <section id="certificates" className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">7. Certificates</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Certificates may be issued upon successful completion of a course.</li>
              <li>Issuance is subject to meeting course requirements and assessments.</li>
              <li>We reserve the right to verify student identity before certificate issuance.</li>
            </ul>
          </section>

          {/* 8. Availability */}
          <section id="availability" className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">8. Availability & Website Access</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>We strive to ensure uninterrupted access but do not guarantee continuous availability.</li>
              <li>We may suspend or restrict access for maintenance, security, or technical reasons.</li>
              <li>We are not liable for any disruption, delay, or data loss caused by factors beyond our control.</li>
            </ul>
          </section>

          {/* 9. Liability */}
          <section id="liability" className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">9. Limitation of Liability</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Services are provided on an “as is” basis without warranties of any kind.</li>
              <li>
                We are not responsible for:
                <ul className="list-disc list-inside ml-5 space-y-2">
                  <li>Student academic performance.</li>
                  <li>Errors, interruptions, or delays in Website operation.</li>
                  <li>Unauthorized access to accounts due to user negligence.</li>
                </ul>
              </li>
              <li>Our total liability shall not exceed the amount paid for the specific Service.</li>
            </ul>
          </section>

          {/* 10. Indemnity */}
          <section id="indemnity" className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">10. Indemnity</h2>
            <p className="text-gray-700 text-base leading-relaxed">
              You agree to indemnify and hold harmless the Company, its directors,
              employees, and affiliates from any claims, damages, liabilities, or
              expenses arising out of your use of the Website or Services,
              violation of these Terms, or infringement of third-party rights.
            </p>
          </section>

          {/* 11. Termination */}
          <section id="termination" className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">11. Termination</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>We may suspend or terminate your account if you violate these Terms.</li>
              <li>You may terminate your account at any time by contacting us.</li>
              <li>Upon termination, your right to access Services ceases, but obligations relating to intellectual property, limitation of liability, and indemnity survive.</li>
            </ul>
          </section>

          {/* 12. Governing Law */}
          <section id="governing" className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">12. Governing Law & Dispute Resolution</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>These Terms are governed by the laws of India.</li>
              <li>Any disputes shall first be resolved through mutual discussion.</li>
              <li>If unresolved, disputes shall be referred to arbitration under the Arbitration and Conciliation Act, 1996, with a sole arbitrator appointed by the Company.</li>
              <li>The seat of arbitration shall be Hyderabad, India, and proceedings shall be conducted in English.</li>
            </ul>
          </section>

          {/* 13. Amendments */}
          <section id="amendments" className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">13. Amendments</h2>
            <p className="text-gray-700 text-base leading-relaxed">
              We may update these Terms periodically. Updated versions will be
              posted on this page with the effective date. Continued use of Services
              after updates constitutes acceptance of the revised Terms.
            </p>
          </section>

          {/* 14. Business Continuity */}
          <section id="continuity" className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">14. Business Continuity</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>We take commercially reasonable steps to ensure continuity of Services, including backups of course materials, student data, and technical infrastructure.</li>
              <li>
                In the event of disruptions such as platform outages, cyber incidents, or faculty unavailability, we may:
                <ol className="list-decimal list-inside ml-5 space-y-2">
                  <li>Use alternate platforms (Zoom, Google Meet, Microsoft Teams, etc.) for classes.</li>
                  <li>Provide recordings, rescheduled sessions, or equivalent course content.</li>
                  <li>Assign substitute faculty where required.</li>
                </ol>
              </li>
              <li>While we strive to minimize disruptions, we do not guarantee uninterrupted Services and shall not be liable for failures caused by events beyond our control.</li>
              <li>Refunds or compensation, if any, will be governed exclusively by our Refund Policy.</li>
              <li>Customers are responsible for maintaining stable internet, devices, and software updates necessary to access Services.</li>
            </ul>
          </section>

          {/* 15. No Abusive Content */}
          <section id="abuse" className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">15. No Abusive Content & Communication</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>The Company is committed to maintaining a respectful, professional, and abuse-free environment.</li>
              <li>We do not create, publish, or promote any abusive, offensive, discriminatory, or harmful content through our Website or Services.</li>
              <li>Users agree not to engage in abusive, threatening, harassing, defamatory, or otherwise inappropriate language or behaviour towards faculty, staff, or other students while using the Services.</li>
              <li>Any violation may result in suspension or termination of access to the Services, without refund, in addition to any legal remedies available.</li>
            </ul>
          </section>

          {/* 16. Contact */}
          <section id="contact" className="bg-blue-50 border border-blue-100 rounded-lg p-5 space-y-2">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">16. Contact Us</h2>
            <p className="text-gray-700">
              For questions, feedback, or concerns regarding these Terms, contact us:
            </p>
            <p className="text-gray-700">
              <strong>Hicap Edtech Private Limited</strong>
              <br />
              Email:{" "}
              <a href="mailto:techsterker@gmail.com" className="text-blue-600 hover:underline">
                techsterker@gmail.com
              </a>
              <br />
              Phone:{" "}
              <a href="tel:+919000207286" className="text-blue-600 hover:underline">
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

export default TermsOfUse;
